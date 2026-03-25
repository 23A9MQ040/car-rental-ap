package com.apcars.controller;

import com.apcars.model.Car;
import com.apcars.model.User;
import com.apcars.model.Booking;
import com.apcars.repository.BookingRepository;
import com.apcars.repository.CarRepository;
import com.apcars.repository.PaymentRepository;
import com.apcars.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final BookingRepository bookingRepository;
    private final PaymentRepository paymentRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/cars")
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }
    
    @PostMapping("/cars")
    public Car addCar(@RequestBody Car car) {
        return carRepository.save(car);
    }

    @DeleteMapping("/cars/{id}")
    public void deleteCar(@PathVariable Long id) {
        carRepository.deleteById(id);
    }

    @GetMapping("/bookings")
    public List<Booking> getAllAdminBookings() {
        return bookingRepository.findAll();
    }

    @PutMapping("/bookings/{id}/status")
    public Booking updateBookingStatus(@PathVariable Long id, @RequestParam String status) {
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    @GetMapping("/stats/revenue")
    public Map<String, Object> getRevenueStats() {
        Double totalRevenue = paymentRepository.findAll().stream()
                .filter(p -> "SUCCESS".equals(p.getStatus()))
                .mapToDouble(p -> p.getAmount())
                .sum();
        
        Map<String, Object> map = new HashMap<>();
        map.put("totalRevenue", totalRevenue);
        map.put("currency", "INR");
        return map;
    }

    @GetMapping("/stats/dashboard")
    public Map<String, Object> getDashboardStats() {
        long totalUsers = userRepository.count();
        long totalCars = carRepository.count();
        long availableCars = carRepository.findByAvailableTrue().size();
        long totalBookings = bookingRepository.count();

        Map<String, Object> map = new HashMap<>();
        map.put("totalUsers", totalUsers);
        map.put("totalCars", totalCars);
        map.put("availableCars", availableCars);
        map.put("totalBookings", totalBookings);
        return map;
    }
}
