# 🚗 AP Car Rentals – Car Rental Management System
### Full-Stack Web Application for Andhra Pradesh, India

[![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.3-brightgreen?style=flat-square&logo=springboot)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)](https://mysql.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-yellow?style=flat-square)](https://jwt.io/)

---

## 📌 Project Overview

A complete web-based **Car Rental Management System** tailored for **Andhra Pradesh, India**, enabling users to browse, book, and rent cars online across 8 major AP cities.

### Key Features
- 🔐 **User Authentication** – Register & Login with JWT-based security
- 🚘 **Car Browsing** – Filter by city, type, fuel, price, and sort options
- 📅 **Booking Management** – Instant booking with auto cost calculation
- 💳 **Payment Options** – UPI, Card, Net Banking, Pay at Pickup
- 👤 **User Dashboard** – Booking history, stats, and cancel bookings
- 🛠️ **Admin Module** – Add/delete vehicles, manage reservations, view customers
- 🏙️ **AP Cities Coverage** – Visakhapatnam, Vijayawada, Tirupati, Guntur, Kakinada, Rajahmundry, Nellore, Kurnool

---

## 🏗️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Backend Framework | Spring Boot 3.2.3 |
| Language | Java 17 |
| Security | Spring Security + JWT (jjwt 0.11.5) |
| Database ORM | Spring Data JPA / Hibernate |
| Database | MySQL 8.0 |
| Password Hashing | BCrypt |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Fonts | Google Fonts (Inter, Poppins) |
| Build Tool | Apache Maven |

---

## 📁 Project Structure

```
carr/
├── pom.xml
└── src/
    └── main/
        ├── java/com/carrental/
        │   ├── CarRentalApplication.java       ← Entry point
        │   ├── entity/
        │   │   ├── User.java                   ← User entity (USER/ADMIN roles)
        │   │   ├── Car.java                    ← Vehicle entity
        │   │   └── Booking.java                ← Booking entity
        │   ├── repository/
        │   │   ├── UserRepository.java
        │   │   ├── CarRepository.java
        │   │   └── BookingRepository.java
        │   ├── service/
        │   │   ├── AuthService.java            ← Register/Login logic
        │   │   ├── CarService.java             ← Car CRUD + filtering
        │   │   └── BookingService.java         ← Booking + cost calc
        │   ├── controller/
        │   │   ├── AuthController.java         ← POST /api/auth/*
        │   │   ├── CarController.java          ← GET /api/cars/*
        │   │   ├── BookingController.java      ← /api/bookings/*
        │   │   └── AdminController.java        ← /api/admin/* (ADMIN only)
        │   ├── security/
        │   │   ├── JwtUtil.java                ← Token generation/validation
        │   │   ├── JwtAuthFilter.java          ← Request filter
        │   │   └── SecurityConfig.java         ← Security chain config
        │   └── dto/
        │       ├── AuthRequest.java
        │       ├── AuthResponse.java
        │       └── BookingRequest.java
        └── resources/
            ├── application.properties          ← DB, JWT, JPA config
            ├── data.sql                        ← 15 cars seed data
            └── static/                         ← Frontend files
                ├── index.html                  ← Landing page
                ├── login.html                  ← Login
                ├── register.html               ← Register
                ├── browse-cars.html            ← Car listing + filters
                ├── car-details.html            ← Car detail + booking form
                ├── booking.html                ← Payment & confirmation
                ├── user-dashboard.html         ← User portal
                ├── admin-dashboard.html        ← Admin panel
                ├── css/style.css               ← AP-themed design system
                └── js/main.js                  ← API utilities + demo data
```

---

## 🚀 Getting Started

### Prerequisites
- Java 17+ (JDK)
- Apache Maven 3.x
- MySQL 8.0

### 1. Clone / Extract the Project
```bash
cd c:\Users\saiva\Downloads\carr
```

### 2. Create the MySQL Database
```sql
CREATE DATABASE carrental_ap
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

### 3. Configure Database
Edit `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/carrental_ap?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=Asia/Kolkata
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD_HERE
```

### 4. Run the Application
```bash
mvn spring-boot:run
```

The server starts at **http://localhost:8080**

Tables are auto-created by Hibernate (`ddl-auto=update`) and 15 cars are seeded from `data.sql`.

### 5. Access the Application
| URL | Description |
|-----|-------------|
| http://localhost:8080 | Landing page |
| http://localhost:8080/login.html | User login |
| http://localhost:8080/register.html | New user registration |
| http://localhost:8080/browse-cars.html | Browse all cars |
| http://localhost:8080/admin-dashboard.html | Admin panel |

---

## 🌐 REST API Endpoints

### Authentication (Public)
```
POST /api/auth/register   → Register new user
POST /api/auth/login      → Login → returns JWT token
```

### Cars (Public)
```
GET  /api/cars                    → All available cars
GET  /api/cars/{id}               → Single car details
GET  /api/cars/city/{city}        → Cars by AP city
GET  /api/cars/type/{type}        → Cars by type
```

### Bookings (Requires USER or ADMIN JWT)
```
POST /api/bookings               → Create new booking
GET  /api/bookings/user/{id}     → User's booking history
GET  /api/bookings/{id}          → Single booking
PUT  /api/bookings/{id}/cancel   → Cancel booking
```

### Admin (Requires ADMIN JWT)
```
GET    /api/admin/cars             → All cars (incl. unavailable)
POST   /api/admin/cars             → Add new car
PUT    /api/admin/cars/{id}        → Update car
DELETE /api/admin/cars/{id}        → Delete car
PUT    /api/admin/cars/{id}/availability?available=true|false
GET    /api/admin/bookings         → All bookings
PUT    /api/admin/bookings/{id}/status?status=CONFIRMED|ACTIVE|COMPLETED|CANCELLED
GET    /api/admin/users            → All users
```

---

## 🗄️ Database Schema

### `users`
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT PK (AUTO) | |
| name | VARCHAR | |
| email | VARCHAR UNIQUE | |
| password | VARCHAR | BCrypt hashed |
| phone | VARCHAR | |
| city | VARCHAR | AP city |
| driving_license | VARCHAR | |
| role | ENUM | USER, ADMIN |

### `cars`
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT PK (AUTO) | |
| brand | VARCHAR | e.g., Hyundai |
| model | VARCHAR | e.g., Creta |
| year | INT | |
| type | ENUM | HATCHBACK, SEDAN, SUV, LUXURY, MINIVAN, TRUCK |
| fuel_type | ENUM | PETROL, DIESEL, ELECTRIC, HYBRID, CNG |
| transmission | ENUM | MANUAL, AUTOMATIC |
| seats | INT | |
| price_per_day | DECIMAL | In ₹ INR |
| city | VARCHAR | AP city |
| available | BOOLEAN | |
| image_url | VARCHAR | |
| description | TEXT | |
| registration_number | VARCHAR UNIQUE | |

### `bookings`
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT PK (AUTO) | |
| user_id | BIGINT FK | → users |
| car_id | BIGINT FK | → cars |
| pickup_city | VARCHAR | |
| drop_city | VARCHAR | |
| pickup_date | DATE | |
| return_date | DATE | |
| total_cost | DECIMAL | Auto-calculated |
| status | ENUM | PENDING, CONFIRMED, ACTIVE, COMPLETED, CANCELLED |
| created_at | DATETIME | |
| special_requests | VARCHAR | |

---

## 🌆 Available Cars & Cities

| City | Examples | Cars |
|------|----------|------|
| Visakhapatnam 🌊 | Swift, Creta, Camry Hybrid | 35+ |
| Vijayawada 🏙️ | Innova Crysta, Honda City, Kia Carens | 28+ |
| Tirupati 🛕 | Dzire, Fortuner 4WD | 22+ |
| Guntur 🌶️ | Hyundai i20, Kia Seltos | 18+ |
| Kakinada ⚡ | Tata Nexon EV, Hyundai Verna | 15+ |
| Rajahmundry 🌿 | Maruti Ertiga CNG | 12+ |
| Nellore 🐟 | Alto K10 | 14+ |
| Kurnool 🏔️ | Mahindra Thar (off-road) | 10+ |

---

## 🔑 Default Test Credentials

> Register a new account on the /register page, then use admin-dashboard manually via direct URL for admin access.
>
> To create an admin user, set `role = 'ADMIN'` directly in MySQL:
> ```sql
> UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
> ```

---

## 💡 Demo Mode (No Backend Required)

The frontend pages work **standalone** without starting the Spring Boot server.  
Open any `.html` file directly in your browser — the `js/main.js` includes 15 cars as static fallback data for a complete UI demo.

---

## 🎟️ Promo Code

Use **`APTRAVEL10`** on the booking page for **10% off** your first rental!

---

*© 2026 AP Car Rentals · Made with ❤️ in Andhra Pradesh, India*
