package com.carrental.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class BookingRequest {
    private Long carId;
    private Long userId;
    private String pickupCity;
    private String dropCity;
    private LocalDate pickupDate;
    private LocalDate returnDate;
    private String specialRequests;
}
