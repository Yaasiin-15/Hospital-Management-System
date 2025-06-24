# Hospital Management System 🏥

A comprehensive hospital management system built with modern technologies.

## Architecture

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query + Context API
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Framework**: Spring Boot 3.2
- **Language**: Java 17
- **Database**: PostgreSQL
- **Security**: Spring Security + JWT
- **Build Tool**: Maven
- **Migration**: Flyway

## Features

### User Roles
- **Admin**: System management, user management, reports
- **Doctor**: Patient management, appointments, medical records
- **Nurse**: Patient care, medications, vitals tracking
- **Receptionist**: Patient registration, appointment booking
- **Patient**: View appointments, medical history, billing

### Core Modules
- Authentication & Authorization
- Patient Management
- Doctor Management
- Appointment Scheduling
- Medical Records
- Billing & Payments
- Department Management
- Inventory Management (Optional)

## Getting Started

### Prerequisites
- Node.js 18+
- Java 17+
- PostgreSQL 15+
- Maven 3.8+

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
mvn spring-boot:run
```

### Database Setup
```sql
CREATE DATABASE hospital_management;
CREATE USER hospital_user WITH PASSWORD 'hospital_password';
GRANT ALL PRIVILEGES ON DATABASE hospital_management TO hospital_user;
```

## Project Structure

```
hospital-management-system/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom hooks
│   │   ├── context/        # React contexts
│   │   ├── utils/          # Utility functions
│   │   └── layouts/        # Layout components
│   └── package.json
├── backend/                 # Spring Boot backend
│   ├── src/main/java/com/hospital/management/
│   │   ├── controller/     # REST controllers
│   │   ├── service/        # Business logic
│   │   ├── repository/     # Data access
│   │   ├── model/          # Entity models
│   │   ├── dto/            # Data transfer objects
│   │   ├── config/         # Configuration
│   │   └── util/           # Utilities
│   └── pom.xml
└── README.md
```

## API Documentation
The backend provides RESTful APIs for all operations. Once running, API documentation will be available at `http://localhost:8080/api/swagger-ui.html`

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License.