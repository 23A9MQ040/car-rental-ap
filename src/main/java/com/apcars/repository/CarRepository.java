package com.apcars.repository;

import com.apcars.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByAvailableTrue();
    List<Car> findByOwnerId(Long ownerId);

    // Query to find nearby cars (simple bounding box logic for mock GPS functionality)
    // In a real production app, you'd use spatial extensions (PostGIS, spatial index, etc.)
    @Query("SELECT c FROM Car c WHERE c.available = true AND c.lat BETWEEN :minLat AND :maxLat AND c.lng BETWEEN :minLng AND :maxLng")
    List<Car> findNearbyAvailableCars(@Param("minLat") Double minLat, @Param("maxLat") Double maxLat, 
                                      @Param("minLng") Double minLng, @Param("maxLng") Double maxLng);
}
