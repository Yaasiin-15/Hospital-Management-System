# Hospital Management System - Backend

## Technology Stack
- Java 17
- Spring Boot 3.2.0
- PostgreSQL
- Spring Security + JWT
- Maven

## Setup Instructions

1. Install Java 17
2. Install PostgreSQL
3. Create database: `hospital_management`
4. Update `application.properties` with your database credentials
5. Run: `mvn spring-boot:run`

## API Endpoints
- Authentication: `/api/auth/*`
- Patients: `/api/patients/*`
- Doctors: `/api/doctors/*`
- Appointments: `/api/appointments/*`
- Medical Records: `/api/medical-records/*`
- Billing: `/api/billing/*`