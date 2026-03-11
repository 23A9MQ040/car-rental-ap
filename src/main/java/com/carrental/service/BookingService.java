package com.carrental.service;

import com.carrental.dto.BookingRequest;
import com.carrental.entity.Booking;
import com.carrental.entity.Car;
import com.carrental.entity.User;
import com.carrental.repository.BookingRepository;
import com.carrental.repository.CarRepository;
import com.carrental.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;

    public Booking createBooking(BookingRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Car car = carRepository.findById(request.getCarId())
                .orElseThrow(() -> new RuntimeException("Car not found"));

        if (!car.getAvailable()) {
            throw new RuntimeException("Car is not available for the selected dates");
        }

        long days = ChronoUnit.DAYS.between(request.getPickupDate(), request.getReturnDate());
        if (days <= 0) throw new RuntimeException("Return date must be after pickup date");

        BigDecimal totalCost = car.getPricePerDay().multiply(BigDecimal.valueOf(days));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setCar(car);
        booking.setPickupCity(request.getPickupCity());
        booking.setDropCity(request.getDropCity());
        booking.setPickupDate(request.getPickupDate());
        booking.setReturnDate(request.getReturnDate());
        booking.setTotalCost(totalCost);
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        booking.setSpecialRequests(request.getSpecialRequests());

        // Mark car as unavailable
        car.setAvailable(false);
        carRepository.save(car);

        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
    }

    public Booking updateBookingStatus(Long id, String status) {
        Booking booking = getBookingById(id);
        booking.setStatus(Booking.BookingStatus.valueOf(status.toUpperCase()));
        if (status.equalsIgnoreCase("COMPLETED") || status.equalsIgnoreCase("CANCELLED")) {
            booking.getCar().setAvailable(true);
            carRepository.save(booking.getCar());
        }
        return bookingRepository.save(booking);
    }

    public void cancelBooking(Long id) {
        Booking booking = getBookingById(id);
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        booking.getCar().setAvailable(true);
        carRepository.save(booking.getCar());
        bookingRepository.save(booking);
    }
}
