package com.carrental.service;

import com.carrental.entity.Car;
import com.carrental.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarRepository carRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public List<Car> getAvailableCars() {
        return carRepository.findByAvailableTrue();
    }

    public Car getCarById(Long id) {
        return carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found with id: " + id));
    }

    public List<Car> getCarsByCity(String city) {
        return carRepository.findByCityAndAvailableTrue(city);
    }

    public List<Car> getCarsByType(String type) {
        return carRepository.findByType(Car.CarType.valueOf(type.toUpperCase()));
    }

    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    public Car updateCar(Long id, Car updatedCar) {
        Car existing = getCarById(id);
        existing.setBrand(updatedCar.getBrand());
        existing.setModel(updatedCar.getModel());
        existing.setYear(updatedCar.getYear());
        existing.setType(updatedCar.getType());
        existing.setFuelType(updatedCar.getFuelType());
        existing.setTransmission(updatedCar.getTransmission());
        existing.setPricePerDay(updatedCar.getPricePerDay());
        existing.setCity(updatedCar.getCity());
        existing.setAvailable(updatedCar.getAvailable());
        existing.setImageUrl(updatedCar.getImageUrl());
        existing.setDescription(updatedCar.getDescription());
        existing.setSeats(updatedCar.getSeats());
        return carRepository.save(existing);
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    public Car updateAvailability(Long id, boolean available) {
        Car car = getCarById(id);
        car.setAvailable(available);
        return carRepository.save(car);
    }
}
