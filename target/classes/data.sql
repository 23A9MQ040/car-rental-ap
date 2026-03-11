-- Data initialization for Car Rental AP
-- Only insert if cars table is empty
INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Maruti Suzuki', 'Swift', 2022, 'HATCHBACK', 'PETROL', 'MANUAL', 5, 1200.00, 'Visakhapatnam', true,
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/2024_Suzuki_Swift_%28New_Zealand%29.jpg/800px-2024_Suzuki_Swift_%28New_Zealand%29.jpg',
  'Popular city car perfect for Vizag city rides. Fuel-efficient and easy to park.', 'AP38AZ1001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP38AZ1001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Hyundai', 'Creta', 2023, 'SUV', 'DIESEL', 'AUTOMATIC', 5, 2500.00, 'Visakhapatnam', true,
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/2020_Hyundai_Creta_1.4_Turbo_SX_%28O%29_%28India%29_front_view.png/800px-2020_Hyundai_Creta_1.4_Turbo_SX_%28O%29_%28India%29_front_view.png',
  'Premium SUV for comfortable long drives along the Vizag coast and Eastern Ghats.', 'AP38BZ2001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP38BZ2001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Toyota', 'Innova Crysta', 2022, 'SUV', 'DIESEL', 'MANUAL', 7, 3000.00, 'Vijayawada', true,
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/2016_Toyota_Innova_2.0_G_wagon_%28TGN140R%3B_05-18-2023%29.jpg/800px-2016_Toyota_Innova_2.0_G_wagon_%28TGN140R%3B_05-18-2023%29.jpg',
  'Spacious 7-seater, ideal for family trips from Vijayawada to Tirupati or Amaravati.', 'AP16CZ3001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP16CZ3001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Honda', 'City', 2023, 'SEDAN', 'PETROL', 'AUTOMATIC', 5, 1800.00, 'Vijayawada', true,
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/2021_Honda_City_1.5_RS_sedan_%28GN5%3B_05-18-2023%29.jpg/800px-2021_Honda_City_1.5_RS_sedan_%28GN5%3B_05-18-2023%29.jpg',
  'Elegant sedan with automatic transmission. Perfect for business travel in Vijayawada.', 'AP16DZ4001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP16DZ4001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Maruti Suzuki', 'Dzire', 2022, 'SEDAN', 'PETROL', 'MANUAL', 5, 1400.00, 'Tirupati', true,
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/2017_Maruti_Suzuki_Dzire_VXi_%28India%29.jpg/800px-2017_Maruti_Suzuki_Dzire_VXi_%28India%29.jpg',
  'Comfortable sedan for Tirupati pilgrimage trips. Reliable and fuel efficient.', 'AP09EZ5001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP09EZ5001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Toyota', 'Fortuner', 2023, 'SUV', 'DIESEL', 'AUTOMATIC', 7, 4500.00, 'Tirupati', true,
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/2021_Toyota_Fortuner_2.4_VRZ_wagon_%28GUN165R%3B_05-18-2023%29_%282%29.jpg/800px-2021_Toyota_Fortuner_2.4_VRZ_wagon_%28GUN165R%3B_05-18-2023%29_%282%29.jpg',
  'Premium SUV for comfortable pilgrimage to Tirumala Venkateswara temple. 4WD capability.', 'AP09FZ6001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP09FZ6001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Hyundai', 'i20', 2023, 'HATCHBACK', 'PETROL', 'AUTOMATIC', 5, 1500.00, 'Guntur', true,
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/2021_Hyundai_i20_Asta_%28India%29_front_view.jpg/800px-2021_Hyundai_i20_Asta_%28India%29_front_view.jpg',
  'Modern hatchback for city commutes in Guntur. Great mileage and stylish look.', 'AP07GZ7001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP07GZ7001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Kia', 'Seltos', 2023, 'SUV', 'DIESEL', 'AUTOMATIC', 5, 2800.00, 'Guntur', true,
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/2020_Kia_Seltos_1.4_T-GDi_EX_wagon_%28SP2%3B_05-18-2023%29.jpg/800px-2020_Kia_Seltos_1.4_T-GDi_EX_wagon_%28SP2%3B_05-18-2023%29.jpg',
  'Tech-loaded SUV from Kia. Best for Guntur to Amaravati and Nagarjunakonda trips.', 'AP07HZ8001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP07HZ8001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Tata', 'Nexon EV', 2023, 'SUV', 'ELECTRIC', 'AUTOMATIC', 5, 2200.00, 'Kakinada', true,
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Tata_Nexon_EV_facelift_in_India.jpg/800px-Tata_Nexon_EV_facelift_in_India.jpg',
  'Eco-friendly EV car for Kakinada port town. Zero emissions, modern features.', 'AP16IZ9001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP16IZ9001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Maruti Suzuki', 'Ertiga', 2022, 'MINIVAN', 'CNG', 'MANUAL', 7, 1900.00, 'Rajahmundry', true,
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/2019_Suzuki_Ertiga_GL_wagon_%28NC22S%3B_05-18-2023%29.jpg/800px-2019_Suzuki_Ertiga_GL_wagon_%28NC22S%3B_05-18-2023%29.jpg',
  'CNG-powered MPV for Rajahmundry sightseeing. Great for Godavari river trips.', 'AP05JZ0001'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP05JZ0001') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Toyota', 'Camry', 2023, 'LUXURY', 'HYBRID', 'AUTOMATIC', 5, 5000.00, 'Visakhapatnam', true,
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/800px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg',
  'Premium luxury hybrid sedan. Perfect for executive travel in Vizag.', 'AP38KZ1101'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP38KZ1101') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Maruti Suzuki', 'Alto K10', 2022, 'HATCHBACK', 'PETROL', 'MANUAL', 5, 900.00, 'Nellore', true,
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/2022_Maruti_Suzuki_Alto_K10_%28India%29_front_view.jpg/800px-2022_Maruti_Suzuki_Alto_K10_%28India%29_front_view.jpg',
  'Budget-friendly hatchback for Nellore city commutes. Most affordable option.', 'AP24LZ1201'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP24LZ1201') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Mahindra', 'Thar', 2023, 'SUV', 'DIESEL', 'MANUAL', 4, 3500.00, 'Kurnool', true,
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Mahindra_Thar_2020.jpg/800px-Mahindra_Thar_2020.jpg',
  'Off-road 4x4 for Kurnool adventures. Explore Belum Caves and Nallamala Forest in style.', 'AP21MZ1301'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP21MZ1301') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Hyundai', 'Verna', 2023, 'SEDAN', 'PETROL', 'AUTOMATIC', 5, 2000.00, 'Kakinada', true,
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/2018_Hyundai_Accent_GL_sedan_%281%29.jpg/800px-2018_Hyundai_Accent_GL_sedan_%281%29.jpg',
  'Sporty sedan for Kakinada coastal drives. Turbocharged engine, premium interiors.', 'AP22NZ1401'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP22NZ1401') LIMIT 1;

INSERT INTO cars (brand, model, year, type, fuel_type, transmission, seats, price_per_day, city, available, image_url, description, registration_number)
SELECT * FROM (SELECT
  'Kia', 'Carens', 2023, 'MINIVAN', 'DIESEL', 'AUTOMATIC', 7, 2600.00, 'Vijayawada', true,
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/2022_Kia_Carens_1.5_Premium_%28KY%3B_05-18-2023%29.jpg/800px-2022_Kia_Carens_1.5_Premium_%28KY%3B_05-18-2023%29.jpg',
  'Premium MPV for family trips from Vijayawada. Perfect for the Amravati capital region.', 'AP16OZ1501'
) AS tmp WHERE NOT EXISTS (SELECT 1 FROM cars WHERE registration_number='AP16OZ1501') LIMIT 1;
