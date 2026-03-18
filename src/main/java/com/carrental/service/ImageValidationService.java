package com.carrental.service;

import com.carrental.entity.Car;
import com.carrental.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageValidationService {

    private final CarRepository carRepository;
    private static final String DEFAULT_PLACEHOLDER = "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop";

    public Map<String, Object> auditAllCarImages() {
        List<Car> cars = carRepository.findAll();
        int totalScanned = cars.size();
        int fixedCount = 0;
        int validCount = 0;

        for (Car car : cars) {
            String url = car.getImageUrl();
            if (url == null || url.trim().isEmpty() || url.contains("via.placeholder.com")) {
                car.setImageUrl(DEFAULT_PLACEHOLDER);
                carRepository.save(car);
                fixedCount++;
                continue;
            }

            if (isUrlBroken(url)) {
                car.setImageUrl(DEFAULT_PLACEHOLDER);
                carRepository.save(car);
                fixedCount++;
            } else {
                validCount++;
            }
        }

        Map<String, Object> report = new HashMap<>();
        report.put("totalScanned", totalScanned);
        report.put("fixedCount", fixedCount);
        report.put("validCount", validCount);
        report.put("placeholderUsed", DEFAULT_PLACEHOLDER);
        
        log.info("Finished Image Audit: Scanned={}, Fixed={}, Valid={}", totalScanned, fixedCount, validCount);
        return report;
    }

    private boolean isUrlBroken(String urlString) {
        try {
            java.net.URI uri = java.net.URI.create(urlString);
            URL url = uri.toURL();
            HttpURLConnection huc = (HttpURLConnection) url.openConnection();
            huc.setRequestMethod("HEAD");
            huc.setConnectTimeout(5000);
            huc.setReadTimeout(5000);
            int responseCode = huc.getResponseCode();
            return responseCode < 200 || responseCode >= 400;
        } catch (Exception e) {
            log.warn("Failed to validate image URL {}: {}", urlString, e.getMessage());
            return true;
        }
    }
}
