# Hospital Management System - Backend Setup Guide

## 🚀 Backend Technology Stack
- **Framework**: Spring Boot 3.x
- **Database**: PostgreSQL 15+
- **Security**: Spring Security + JWT
- **Build Tool**: Maven
- **Java Version**: Java 17+

## 📁 Recommended Backend Project Structure

```
hospital-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/hospital/management/
│   │   │       ├── HospitalManagementApplication.java
│   │   │       ├── config/
│   │   │       │   ├── SecurityConfig.java
│   │   │       │   ├── JwtConfig.java
│   │   │       │   └── DatabaseConfig.java
│   │   │       ├── controller/
│   │   │       │   ├── AuthController.java
│   │   │       │   ├── PatientController.java
│   │   │       │   ├── DoctorController.java
│   │   │       │   ├── AppointmentController.java
│   │   │       │   ├── MedicalRecordController.java
│   │   │       │   └── BillingController.java
│   │   │       ├── service/
│   │   │       │   ├── AuthService.java
│   │   │       │   ├── PatientService.java
│   │   │       │   ├── DoctorService.java
│   │   │       │   ├── AppointmentService.java
│   │   │       │   ├── MedicalRecordService.java
│   │   │       │   └── BillingService.java
│   │   │       ├── repository/
│   │   │       │   ├── UserRepository.java
│   │   │       │   ├── PatientRepository.java
│   │   │       │   ├── DoctorRepository.java
│   │   │       │   ├── AppointmentRepository.java
│   │   │       │   ├── MedicalRecordRepository.java
│   │   │       │   └── BillingRepository.java
│   │   │       ├── model/
│   │   │       │   ├── User.java
│   │   │       │   ├── Patient.java
│   │   │       │   ├── Doctor.java
│   │   │       │   ├── Appointment.java
│   │   │       │   ├── MedicalRecord.java
│   │   │       │   ├── Billing.java
│   │   │       │   └── Department.java
│   │   │       ├── dto/
│   │   │       │   ├── request/
│   │   │       │   └── response/
│   │   │       ├── exception/
│   │   │       │   ├── GlobalExceptionHandler.java
│   │   │       │   └── CustomExceptions.java
│   │   │       └── util/
│   │   │           ├── JwtUtil.java
│   │   │           └── DateUtil.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       ├── application-prod.properties
│   │       └── db/
│   │           └── migration/
│   │               ├── V1__create_users_table.sql
│   │               ├── V2__create_patients_table.sql
│   │               ├── V3__create_doctors_table.sql
│   │               ├── V4__create_appointments_table.sql
│   │               └── V5__create_medical_records_table.sql
│   └── test/
│       └── java/
│           └── com/hospital/management/
├── pom.xml
└── README.md
```

## 📋 Required Dependencies (pom.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    
    <groupId>com.hospital</groupId>
    <artifactId>hospital-management</artifactId>
    <version>1.0.0</version>
    <name>hospital-management</name>
    <description>Hospital Management System Backend</description>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Starters -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        
        <!-- Database -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- JWT -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.11.5</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Flyway for DB Migration -->
        <dependency>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-core</artifactId>
        </dependency>
        
        <!-- ModelMapper for DTO conversion -->
        <dependency>
            <groupId>org.modelmapper</groupId>
            <artifactId>modelmapper</artifactId>
            <version>3.1.1</version>
        </dependency>
        
        <!-- Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

## 🗄️ Database Configuration

### application.properties
```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/hospital_management
spring.datasource.username=hospital_user
spring.datasource.password=hospital_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

# Flyway Configuration
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration

# JWT Configuration
jwt.secret=your-secret-key-here
jwt.expiration=86400000

# Server Configuration
server.port=8080
server.servlet.context-path=/api

# CORS Configuration
cors.allowed-origins=http://localhost:5173
```

## 🚀 Getting Started

1. **Create Spring Boot Project**:
   ```bash
   mvn archetype:generate -DgroupId=com.hospital -DartifactId=hospital-management -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
   ```

2. **Setup PostgreSQL Database**:
   ```sql
   CREATE DATABASE hospital_management;
   CREATE USER hospital_user WITH PASSWORD 'hospital_password';
   GRANT ALL PRIVILEGES ON DATABASE hospital_management TO hospital_user;
   ```

3. **Run the Application**:
   ```bash
   mvn spring-boot:run
   ```

## 📊 Core Database Tables

- **users** (id, username, email, password, role, created_at)
- **patients** (id, user_id, medical_number, dob, gender, phone, address)
- **doctors** (id, user_id, employee_id, specialization, department_id)
- **appointments** (id, patient_id, doctor_id, date_time, status, notes)
- **medical_records** (id, patient_id, doctor_id, diagnosis, prescription, date)
- **departments** (id, name, description)
- **billing** (id, patient_id, amount, status, date, description)

## 🔐 API Endpoints Structure

- **Auth**: `/api/auth/login`, `/api/auth/register`
- **Patients**: `/api/patients/*`
- **Doctors**: `/api/doctors/*`
- **Appointments**: `/api/appointments/*`
- **Medical Records**: `/api/medical-records/*`
- **Billing**: `/api/billing/*`

## 🧪 Testing
- Unit tests for services
- Integration tests for controllers
- Repository tests with @DataJpaTest

This backend setup provides a solid foundation for your Hospital Management System with proper security, database management, and scalable architecture.