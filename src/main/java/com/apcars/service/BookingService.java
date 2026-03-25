package com.apcars.service;

import com.apcars.model.Booking;
import com.apcars.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public Booking createBooking(Booking booking) {
        if(booking.getPickupDate() == null || booking.getReturnDate() == null) {
            throw new RuntimeException("Dates cannot be null");
        }
        long days = ChronoUnit.DAYS.between(booking.getPickupDate(), booking.getReturnDate());
        if(days < 1) days = 1;
        
        Double total = days * booking.getCar().getPricePerDay();
        booking.setTotalCost(total);
        booking.setStatus("PENDING");
        return bookingRepository.save(booking);
    }

    public Booking updateBookingStatus(Long bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }
    
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }
}
