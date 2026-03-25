package com.apcars.controller;

import com.apcars.model.Booking;
import com.apcars.model.Car;
import com.apcars.model.User;
import com.apcars.repository.CarRepository;
import com.apcars.repository.UserRepository;
import com.apcars.security.UserDetailsImpl;
import com.apcars.service.BookingService;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final CarRepository carRepository;
    private final UserRepository userRepository;

    @Data
    @NoArgsConstructor
    public static class BookingRequest {
        private Long carId;
        private String pickupCity;
        private String dropCity;
        private String pickupDate;
        private String returnDate;
        private String specialRequests;
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest req, Authentication auth) {
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElse(null);
        Car car = carRepository.findById(req.getCarId()).orElse(null);

        if (car == null || !car.getAvailable()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "Car is not available"));
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setCar(car);
        booking.setPickupCity(req.getPickupCity());
        booking.setDropCity(req.getDropCity());
        booking.setPickupDate(LocalDate.parse(req.getPickupDate()));
        booking.setReturnDate(LocalDate.parse(req.getReturnDate()));
        booking.setSpecialRequests(req.getSpecialRequests());

        Booking saved = bookingService.createBooking(booking);

        car.setAvailable(false);
        carRepository.save(car);

        return ResponseEntity.ok(saved);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user/{userId}")
    public List<Booking> getMyBookings(@PathVariable Long userId, Authentication auth) {
        return bookingService.getUserBookings(userId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }
}
