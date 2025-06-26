-- Users Table Schema
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Departments Table Schema
CREATE TABLE IF NOT EXISTS departments (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    head VARCHAR(100),
    location VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patients Table Schema
CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id),
    medical_number VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob DATE,
    gender VARCHAR(10),
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doctors Table Schema
CREATE TABLE IF NOT EXISTS doctors (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id),
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    specialization VARCHAR(100),
    department_id VARCHAR(36) REFERENCES departments(id),
    phone VARCHAR(20),
    email VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments Table Schema
CREATE TABLE IF NOT EXISTS appointments (
    id VARCHAR(36) PRIMARY KEY,
    patient_id VARCHAR(36) REFERENCES patients(id),
    doctor_id VARCHAR(36) REFERENCES doctors(id),
    date DATE NOT NULL,
    time TIME NOT NULL,
    type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'scheduled',
    notes TEXT,
    duration INT DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(36) REFERENCES users(id)
);

-- Medical Records Table Schema
CREATE TABLE IF NOT EXISTS medical_records (
    id VARCHAR(36) PRIMARY KEY,
    patient_id VARCHAR(36) REFERENCES patients(id),
    doctor_id VARCHAR(36) REFERENCES doctors(id),
    date DATE NOT NULL,
    diagnosis TEXT,
    treatment TEXT,
    notes TEXT,
    follow_up_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(36) REFERENCES users(id)
);

-- Billing Table Schema
CREATE TABLE IF NOT EXISTS billing (
    id VARCHAR(36) PRIMARY KEY,
    patient_id VARCHAR(36) REFERENCES patients(id),
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    due_date DATE,
    paid_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(36) REFERENCES users(id)
);

-- Medication Table Schema
CREATE TABLE IF NOT EXISTS medications (
    id VARCHAR(36) PRIMARY KEY,
    patient_id VARCHAR(36) REFERENCES patients(id),
    doctor_id VARCHAR(36) REFERENCES doctors(id),
    medication_name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50),
    frequency VARCHAR(50),
    start_date DATE,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vitals Table Schema
CREATE TABLE IF NOT EXISTS vitals (
    id VARCHAR(36) PRIMARY KEY,
    patient_id VARCHAR(36) REFERENCES patients(id),
    recorded_by VARCHAR(36) REFERENCES users(id),
    date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    blood_pressure VARCHAR(20),
    temperature DECIMAL(5,2),
    pulse INT,
    respiratory_rate INT,
    oxygen_saturation INT,
    weight DECIMAL(5,2),
    height DECIMAL(5,2),
    pain_level INT,
    notes TEXT
);

-- Department Staff Table Schema
CREATE TABLE IF NOT EXISTS department_staff (
    department_id VARCHAR(36) REFERENCES departments(id),
    user_id VARCHAR(36) REFERENCES users(id),
    role VARCHAR(50),
    PRIMARY KEY (department_id, user_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_patients_medical_number ON patients(medical_number);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_medical_records_patient_id ON medical_records(patient_id);
CREATE INDEX IF NOT EXISTS idx_billing_patient_id ON billing(patient_id);
CREATE INDEX IF NOT EXISTS idx_medications_patient_id ON medications(patient_id);