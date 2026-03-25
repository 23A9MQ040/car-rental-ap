package com.apcars.controller;

import com.apcars.model.Car;
import com.apcars.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
public class CarController {

    private final CarService carService;

    // Public endpoint to get all available cars
    @GetMapping
    public List<Car> getAvailableCars() {
        return carService.getAvailableCars();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        return carService.getCarById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Google Maps Integration Endpoint
    @GetMapping("/nearby")
    public List<Car> getNearbyCars(@RequestParam Double lat, @RequestParam Double lng, @RequestParam(defaultValue = "0.1") Double radius) {
        return carService.findNearbyCars(lat, lng, radius);
    }
    
    // Live Location Update (simulate GPS device updating backend)
    @PreAuthorize("hasRole('ADMIN')") 
    @PutMapping("/{id}/location")
    public ResponseEntity<Car> updateLocation(@PathVariable Long id, @RequestParam Double lat, @RequestParam Double lng) {
        try {
            return ResponseEntity.ok(carService.updateCarLocation(id, lat, lng));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
