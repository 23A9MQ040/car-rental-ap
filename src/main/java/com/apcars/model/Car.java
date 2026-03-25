package com.apcars.model;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cars")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String brand;
    
    @Column(nullable = false)
    private String model;
    
    private Integer manufactureYear; // mapped from 'year' in frontend
    
    private Integer seats;
    
    private String type; // HATCHBACK, SEDAN, SUV, LUXURY, MINIVAN
    
    private String fuelType;
    
    private String transmission;
    
    private Double pricePerDay;
    
    private String city;
    
    private String registrationNumber;
    
    private String imageUrl;
    
    @Column(length = 500)
    private String description;
    
    private Boolean available = true;
    
    // Owner Details
    private Long ownerId;
    private String condition;
    private Double fines = 0.0;
    
    // Google Maps Tracking Fields
    private Double lat;
    private Double lng;
}
