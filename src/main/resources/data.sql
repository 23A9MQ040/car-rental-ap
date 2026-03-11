-- Data initialization for Car Rental AP
-- Only insert if cars table is empty
INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Maruti Suzuki', 'Swift', 2022, 'HATCHBACK', 'PETROL', 'MANUAL', 5, 1200.00, 'Visakhapatnam', true,
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/159073/swift-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80',
  'Popular city car perfect for Vizag city rides. Fuel-efficient and easy to park.', 'AP38AZ1001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP38AZ1001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Hyundai', 'Creta', 2023, 'SUV', 'DIESEL', 'AUTOMATIC', 5, 2500.00, 'Visakhapatnam', true,
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/creta-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80',
  'Premium SUV for comfortable long drives along the Vizag coast and Eastern Ghats.', 'AP38BZ2001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP38BZ2001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Toyota', 'Innova Crysta', 2022, 'SUV', 'DIESEL', 'MANUAL', 7, 3000.00, 'Vijayawada', true,
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/44686/innova-crysta-exterior-right-front-three-quarter-10.jpeg?isig=0&q=80',
  'Spacious 7-seater, ideal for family trips from Vijayawada to Tirupati or Amaravati.', 'AP16CZ3001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP16CZ3001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Honda', 'City', 2023, 'SEDAN', 'PETROL', 'AUTOMATIC', 5, 1800.00, 'Vijayawada', true,
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80',
  'Elegant sedan with automatic transmission. Perfect for business travel in Vijayawada.', 'AP16DZ4001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP16DZ4001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Maruti Suzuki', 'Dzire', 2022, 'SEDAN', 'PETROL', 'MANUAL', 5, 1400.00, 'Tirupati', true,
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/161433/dzire-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80',
  'Comfortable sedan for Tirupati pilgrimage trips. Reliable and fuel efficient.', 'AP09EZ5001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP09EZ5001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Toyota', 'Fortuner', 2023, 'SUV', 'DIESEL', 'AUTOMATIC', 7, 4500.00, 'Tirupati', true,
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/44709/fortuner-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80',
  'Premium SUV for comfortable pilgrimage to Tirumala Venkateswara temple. 4WD capability.', 'AP09FZ6001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP09FZ6001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Hyundai', 'i20', 2023, 'HATCHBACK', 'PETROL', 'AUTOMATIC', 5, 1500.00, 'Guntur', true,
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/161831/i20-exterior-right-front-three-quarter.jpeg?isig=0&q=80',
  'Modern hatchback for city commutes in Guntur. Great mileage and stylish look.', 'AP07GZ7001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP07GZ7001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Kia', 'Seltos', 2023, 'SUV', 'DIESEL', 'AUTOMATIC', 5, 2800.00, 'Guntur', true,
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/51435/seltos-exterior-right-front-three-quarter-12.jpeg?isig=0&q=80',
  'Tech-loaded SUV from Kia. Best for Guntur to Amaravati and Nagarjunakonda trips.', 'AP07HZ8001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP07HZ8001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Tata', 'Nexon EV', 2023, 'SUV', 'ELECTRIC', 'AUTOMATIC', 5, 2200.00, 'Kakinada', true,
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/40482/nexon-ev-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80',
  'Eco-friendly EV car for Kakinada port town. Zero emissions, modern features.', 'AP16IZ9001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP16IZ9001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Maruti Suzuki', 'Ertiga', 2022, 'MINIVAN', 'CNG', 'MANUAL', 7, 1900.00, 'Rajahmundry', true,
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/51435/seltos-exterior-right-front-three-quarter-12.jpeg?isig=0&q=80',
  'CNG-powered MPV for Rajahmundry sightseeing. Great for Godavari river trips.', 'AP05JZ0001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP05JZ0001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Toyota', 'Camry', 2023, 'LUXURY', 'HYBRID', 'AUTOMATIC', 5, 5000.00, 'Visakhapatnam', true,
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/108849/camry-exterior-right-front-three-quarter.jpeg?isig=0&q=80',
  'Premium luxury hybrid sedan. Perfect for executive travel in Vizag.', 'AP38KZ1101'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP38KZ1101') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Maruti Suzuki', 'Alto K10', 2022, 'HATCHBACK', 'PETROL', 'MANUAL', 5, 900.00, 'Nellore', true,
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/106929/alto-k10-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80',
  'Budget-friendly hatchback for Nellore city commutes. Most affordable option.', 'AP24LZ1201'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP24LZ1201') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Mahindra', 'Thar', 2023, 'SUV', 'DIESEL', 'MANUAL', 4, 3500.00, 'Kurnool', true,
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/40087/thar-exterior-right-front-three-quarter-19.jpeg?isig=0&q=80',
  'Off-road 4x4 for Kurnool adventures. Explore Belum Caves and Nallamala Forest in style.', 'AP21MZ1301'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP21MZ1301') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Hyundai', 'Verna', 2023, 'SEDAN', 'PETROL', 'AUTOMATIC', 5, 2000.00, 'Kakinada', true,
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/167597/verna-exterior-right-front-three-quarter-6.jpeg?isig=0&q=80',
  'Sporty sedan for Kakinada coastal drives. Turbocharged engine, premium interiors.', 'AP22NZ1401'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP22NZ1401') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Kia', 'Carens', 2023, 'MINIVAN', 'DIESEL', 'AUTOMATIC', 7, 2600.00, 'Vijayawada', true,
  'https://imgd.aeplcdn.com/664x374/n/cw/ec/141125/carens-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80',
  'Premium MPV for family trips from Vijayawada. Perfect for the Amravati capital region.', 'AP16OZ1501'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP16OZ1501') LIMIT 1;
