package com.apcars.controller;

import com.apcars.model.Payment;
import com.apcars.security.UserDetailsImpl;
import com.apcars.service.PaymentService;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @Data
    @NoArgsConstructor
    public static class PaymentRequest {
        private Long bookingId;
        private String paymentMethod;
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PostMapping("/process")
    public ResponseEntity<?> processPayment(@RequestBody PaymentRequest req) {
        try {
            Payment payment = paymentService.processPayment(req.getBookingId(), req.getPaymentMethod());
            if ("FAILED".equals(payment.getStatus())) {
                Map<String, String> err = new HashMap<>();
                err.put("error", "Payment failed!");
                err.put("transactionId", payment.getTransactionId());
                return ResponseEntity.badRequest().body(err);
            }
            return ResponseEntity.ok(payment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/history")
    public List<Payment> getMyPayments(Authentication auth) {
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        return paymentService.getUserPayments(userDetails.getId());
    }
}
