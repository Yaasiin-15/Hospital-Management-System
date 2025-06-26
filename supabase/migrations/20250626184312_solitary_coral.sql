-- Initial Users Data
INSERT INTO users (id, username, email, password, role, created_at, updated_at) VALUES
('1', 'admin', 'admin@hospital.com', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOSsqQHi6OUA/qiBt5NWBAZ4X/6XS', 'ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2', 'doctor', 'doctor@hospital.com', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOSsqQHi6OUA/qiBt5NWBAZ4X/6XS', 'DOCTOR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('3', 'nurse', 'nurse@hospital.com', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOSsqQHi6OUA/qiBt5NWBAZ4X/6XS', 'NURSE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('4', 'receptionist', 'receptionist@hospital.com', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOSsqQHi6OUA/qiBt5NWBAZ4X/6XS', 'RECEPTIONIST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('5', 'patient', 'patient@hospital.com', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOSsqQHi6OUA/qiBt5NWBAZ4X/6XS', 'PATIENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Sample Departments
CREATE TABLE IF NOT EXISTS departments (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO departments (id, name, description) VALUES
('d1', 'Cardiology', 'Heart and cardiovascular care'),
('d2', 'Neurology', 'Brain and nervous system treatments'),
('d3', 'Orthopedics', 'Bone and joint care'),
('d4', 'Pediatrics', 'Medical care for children'),
('d5', 'Emergency', 'Emergency and trauma care');

-- Sample Patients
CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id),
    medical_number VARCHAR(20) UNIQUE NOT NULL,
    dob DATE,
    gender VARCHAR(10),
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO patients (id, user_id, medical_number, dob, gender, phone, address) VALUES
('p1', '5', 'MN-001', '1985-05-15', 'MALE', '+1234567890', '123 Main St, City'),
('p2', NULL, 'MN-002', '1990-10-20', 'FEMALE', '+1234567891', '456 Oak Ave, Town'),
('p3', NULL, 'MN-003', '1978-03-25', 'MALE', '+1234567892', '789 Pine Rd, Village');

-- Sample Doctors
CREATE TABLE IF NOT EXISTS doctors (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id),
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    specialization VARCHAR(100),
    department_id VARCHAR(36) REFERENCES departments(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO doctors (id, user_id, employee_id, specialization, department_id) VALUES
('doc1', '2', 'EMP-001', 'Cardiologist', 'd1'),
('doc2', NULL, 'EMP-002', 'Neurologist', 'd2'),
('doc3', NULL, 'EMP-003', 'Orthopedic Surgeon', 'd3');

-- Sample Appointments
CREATE TABLE IF NOT EXISTS appointments (
    id VARCHAR(36) PRIMARY KEY,
    patient_id VARCHAR(36) REFERENCES patients(id),
    doctor_id VARCHAR(36) REFERENCES doctors(id),
    date_time TIMESTAMP,
    status VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO appointments (id, patient_id, doctor_id, date_time, status, notes) VALUES
('a1', 'p1', 'doc1', CURRENT_TIMESTAMP + INTERVAL '1 DAY', 'SCHEDULED', 'Regular checkup'),
('a2', 'p2', 'doc2', CURRENT_TIMESTAMP + INTERVAL '2 DAY', 'CONFIRMED', 'Follow-up appointment'),
('a3', 'p3', 'doc3', CURRENT_TIMESTAMP + INTERVAL '3 DAY', 'PENDING', 'New patient consultation');

-- Sample Medical Records
CREATE TABLE IF NOT EXISTS medical_records (
    id VARCHAR(36) PRIMARY KEY,
    patient_id VARCHAR(36) REFERENCES patients(id),
    doctor_id VARCHAR(36) REFERENCES doctors(id),
    diagnosis TEXT,
    prescription TEXT,
    date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO medical_records (id, patient_id, doctor_id, diagnosis, prescription, date) VALUES
('mr1', 'p1', 'doc1', 'Hypertension', 'Lisinopril 10mg daily', CURRENT_TIMESTAMP - INTERVAL '10 DAY'),
('mr2', 'p2', 'doc2', 'Migraine', 'Sumatriptan as needed', CURRENT_TIMESTAMP - INTERVAL '15 DAY'),
('mr3', 'p3', 'doc3', 'Fractured wrist', 'Cast for 6 weeks', CURRENT_TIMESTAMP - INTERVAL '5 DAY');