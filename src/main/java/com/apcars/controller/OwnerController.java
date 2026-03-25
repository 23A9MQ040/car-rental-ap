package com.apcars.controller;

import com.apcars.model.Car;
import com.apcars.security.UserDetailsImpl;
import com.apcars.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/owner")
@PreAuthorize("hasRole('OWNER') or hasRole('ADMIN')")
@RequiredArgsConstructor
public class OwnerController {

    private final CarService carService;

    @GetMapping("/cars")
    public List<Car> getOwnerCars(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return carService.getCarsByOwnerId(userDetails.getId());
    }

    @PostMapping("/cars")
    public Car addCar(@RequestBody Car car, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        car.setOwnerId(userDetails.getId());
        return carService.addCar(car);
    }

    @PutMapping("/cars/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car carDetails, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Car existing = carService.getCarById(id).orElseThrow(() -> new RuntimeException("Car not found"));
        
        boolean isAdmin = userDetails.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (!existing.getOwnerId().equals(userDetails.getId()) && !isAdmin) {
            return ResponseEntity.status(403).build();
        }

        if (carDetails.getCondition() != null) existing.setCondition(carDetails.getCondition());
        if (carDetails.getFines() != null) existing.setFines(carDetails.getFines());
        if (carDetails.getPricePerDay() != null) existing.setPricePerDay(carDetails.getPricePerDay());

        return ResponseEntity.ok(carService.addCar(existing));
    }
}
