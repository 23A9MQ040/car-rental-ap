package com.carrental.repository;

import com.carrental.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByCity(String city);
    List<Car> findByCityAndAvailableTrue(String city);
    List<Car> findByAvailableTrue();
    List<Car> findByType(Car.CarType type);
    List<Car> findByCityAndType(String city, Car.CarType type);
}
