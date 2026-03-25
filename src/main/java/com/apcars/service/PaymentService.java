package com.apcars.service;

import com.apcars.model.Payment;
import com.apcars.model.Booking;
import com.apcars.repository.PaymentRepository;
import com.apcars.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    // Feature 2: Simulate Payment Gateway
    public Payment processPayment(Long bookingId, String paymentMethod) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!"PENDING".equals(booking.getStatus())) {
            throw new RuntimeException("Booking is already processed or cancelled.");
        }

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setUser(booking.getUser());
        payment.setAmount(booking.getTotalCost());
        payment.setPaymentMethod(paymentMethod);
        payment.setTimestamp(LocalDateTime.now());
        
        // Simulating highly complex Razorpay/Stripe mock logic (random success vs fail based on math)
        boolean isSuccess = Math.random() > 0.1; // 90% success rate
        
        if (isSuccess) {
            payment.setStatus("SUCCESS");
            payment.setTransactionId("TXN_" + UUID.randomUUID().toString().substring(0, 10).toUpperCase());
            booking.setStatus("CONFIRMED");
            bookingRepository.save(booking);
        } else {
            payment.setStatus("FAILED");
            payment.setTransactionId("FAILED_" + UUID.randomUUID().toString().substring(0, 10).toUpperCase());
        }
        
        return paymentRepository.save(payment);
    }

    public List<Payment> getUserPayments(Long userId) {
        return paymentRepository.findByUserId(userId);
    }
    
    public Optional<Payment> getPaymentByBooking(Long bookingId) {
        return paymentRepository.findByBookingId(bookingId);
    }
}
