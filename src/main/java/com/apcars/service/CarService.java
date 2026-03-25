package com.apcars.service;

import com.apcars.model.Car;
import com.apcars.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarRepository carRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public List<Car> getCarsByOwnerId(Long ownerId) {
        return carRepository.findByOwnerId(ownerId);
    }

    public List<Car> getAvailableCars() {
        return carRepository.findByAvailableTrue();
    }

    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
    }

    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }
    
    // Feature 1: Live Tracking & Google Maps nearby search
    // This uses a very simple bounding box around the coordinates (~10-15km radius check simulation)
    public List<Car> findNearbyCars(Double lat, Double lng, Double radiusInDegrees) {
        Double minLat = lat - radiusInDegrees;
        Double maxLat = lat + radiusInDegrees;
        Double minLng = lng - radiusInDegrees;
        Double maxLng = lng + radiusInDegrees;
        return carRepository.findNearbyAvailableCars(minLat, maxLat, minLng, maxLng);
    }

    // Feature 1: Update Live Location
    public Car updateCarLocation(Long id, Double lat, Double lng) {
        Car car = carRepository.findById(id).orElseThrow(() -> new RuntimeException("Car not found"));
        car.setLat(lat);
        car.setLng(lng);
        return carRepository.save(car);
    }
}
