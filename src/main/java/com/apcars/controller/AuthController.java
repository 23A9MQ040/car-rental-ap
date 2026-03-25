package com.apcars.controller;

import com.apcars.model.User;
import com.apcars.repository.UserRepository;
import com.apcars.security.JwtUtils;
import com.apcars.security.UserDetailsImpl;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Collections;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    @Data
    @NoArgsConstructor
    public static class LoginRequest {
        @NotBlank(message = "Email is required")
        private String email;
        @NotBlank(message = "Password is required")
        private String password;
    }

    @Data
    @NoArgsConstructor
    public static class SignupRequest {
        @NotBlank(message = "Name is required")
        private String name;
        @NotBlank(message = "Email is required")
        @Email(message = "Email must be valid")
        private String email;
        @NotBlank(message = "Password is required")
        private String password;
        private String phone;
        private String city;
        private String drivingLicense;
        private String role;
    }

    @Data
    @AllArgsConstructor
    public static class JwtResponse {
        private String token;
        private Long userId;
        private String name;
        private String email;
        private String role;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String role = userDetails.getAuthorities().stream().findFirst().get().getAuthority().replace("ROLE_", "");

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getName(), userDetails.getEmail(), role));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "Error: Email is already in use!"));
        }

        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.setPhone(signUpRequest.getPhone());
        user.setCity(signUpRequest.getCity());
        user.setDrivingLicense(signUpRequest.getDrivingLicense());
        
        String roleReq = signUpRequest.getRole();
        if (roleReq == null || roleReq.isEmpty()) {
            user.setRole("USER");
        } else if ("ADMIN".equalsIgnoreCase(roleReq)) {
            user.setRole("ADMIN");
        } else if ("OWNER".equalsIgnoreCase(roleReq)) {
            user.setRole("OWNER");
        } else {
            user.setRole("USER");
        }

        userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signUpRequest.getEmail(), signUpRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        return ResponseEntity.ok(new JwtResponse(jwt, user.getId(), user.getName(), user.getEmail(), user.getRole()));
    }
}
