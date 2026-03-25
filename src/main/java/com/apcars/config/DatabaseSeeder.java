package com.apcars.config;

import com.apcars.model.Car;
import com.apcars.model.User;
import com.apcars.repository.CarRepository;
import com.apcars.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final PasswordEncoder encoder;

    public DatabaseSeeder(UserRepository userRepository, CarRepository carRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.carRepository = carRepository;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByEmail("saivarma111357@gmail.com")) {
            User admin = new User();
            admin.setName("Admin Sai Varma");
            admin.setEmail("saivarma111357@gmail.com");
            admin.setPassword(encoder.encode("12345678"));
            admin.setPhone("9999999999");
            admin.setCity("Visakhapatnam");
            admin.setRole("ADMIN");
            userRepository.save(admin);
        }

        if (carRepository.count() == 0) {
            Car c1 = new Car();
            c1.setBrand("Mercedes-Benz");
            c1.setModel("S-Class");
            c1.setManufactureYear(2023);
            c1.setSeats(5);
            c1.setType("LUXURY");
            c1.setFuelType("Petrol");
            c1.setTransmission("Automatic");
            c1.setPricePerDay(5000.0);
            c1.setCity("Visakhapatnam");
            c1.setRegistrationNumber("AP 31 AB 1234");
            c1.setImageUrl("https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80");
            c1.setDescription("Ultimate luxury and comfort.");
            c1.setAvailable(true);
            c1.setLat(17.6868);
            c1.setLng(83.2185); 
            
            Car c2 = new Car();
            c2.setBrand("BMW");
            c2.setModel("M5");
            c2.setManufactureYear(2022);
            c2.setSeats(5);
            c2.setType("SEDAN");
            c2.setFuelType("Petrol");
            c2.setTransmission("Automatic");
            c2.setPricePerDay(4500.0);
            c2.setCity("Visakhapatnam");
            c2.setRegistrationNumber("AP 31 XY 9999");
            c2.setImageUrl("https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80");
            c2.setDescription("High performance sports sedan.");
            c2.setAvailable(true);
            c2.setLat(17.7128);
            c2.setLng(83.3215); 
            
            carRepository.saveAll(Arrays.asList(c1, c2));
        }
    }
}
