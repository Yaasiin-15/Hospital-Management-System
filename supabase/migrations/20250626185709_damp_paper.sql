-- Insert default users (password is 'password' encrypted with BCrypt)
INSERT INTO users (id, username, email, password, role, created_at, updated_at) VALUES
('1', 'admin', 'admin@hospital.com', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOSsqQHi6OUA/qiBt5NWBAZ4X/6XS', 'ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2', 'doctor', 'doctor@hospital.com', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOSsqQHi6OUA/qiBt5NWBAZ4X/6XS', 'DOCTOR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('3', 'nurse', 'nurse@hospital.com', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOSsqQHi6OUA/qiBt5NWBAZ4X/6XS', 'NURSE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('4', 'receptionist', 'receptionist@hospital.com', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOSsqQHi6OUA/qiBt5NWBAZ4X/6XS', 'RECEPTIONIST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('5', 'patient', 'patient@hospital.com', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOSsqQHi6OUA/qiBt5NWBAZ4X/6XS', 'PATIENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert departments
INSERT INTO departments (id, name, description, head, location, phone, email, status) VALUES
('d1', 'Cardiology', 'Heart and cardiovascular care', 'Dr. Sarah Smith', '2nd Floor, Wing B', '+1 (555) 234-5678', 'cardiology@hospital.com', 'active'),
('d2', 'Neurology', 'Brain and nervous system disorders', 'Dr. Lisa Davis', '4th Floor, Wing A', '+1 (555) 567-8901', 'neurology@hospital.com', 'active'),
('d3', 'Orthopedics', 'Bone, joint, and muscle disorders', 'Dr. Robert Wilson', '1st Floor, Wing D', '+1 (555) 456-7890', 'orthopedics@hospital.com', 'active'),
('d4', 'Pediatrics', 'Children and adolescent care', 'Dr. Emily Brown', '3rd Floor, Wing C', '+1 (555) 345-6789', 'pediatrics@hospital.com', 'active'),
('d5', 'Emergency Medicine', 'Emergency and trauma care services', 'Dr. Sarah Johnson', 'Ground Floor, Wing A', '+1 (555) 123-4567', 'emergency@hospital.com', 'active');

-- Insert patients
INSERT INTO patients (id, user_id, medical_number, first_name, last_name, dob, gender, phone, email, address, status) VALUES
('p1', '5', 'MN001', 'John', 'Doe', '1985-05-15', 'MALE', '+1 (555) 123-4567', 'john.doe@email.com', '123 Main St, City, State 12345', 'active'),
('p2', NULL, 'MN002', 'Jane', 'Smith', '1990-10-20', 'FEMALE', '+1 (555) 234-5678', 'jane.smith@email.com', '456 Oak Ave, City, State 12345', 'active'),
('p3', NULL, 'MN003', 'Mike', 'Johnson', '1978-03-25', 'MALE', '+1 (555) 345-6789', 'mike.johnson@email.com', '789 Pine Rd, City, State 12345', 'active'),
('p4', NULL, 'MN004', 'Sarah', 'Wilson', '1965-08-12', 'FEMALE', '+1 (555) 456-7890', 'sarah.wilson@email.com', '321 Elm Dr, City, State 12345', 'active'),
('p5', NULL, 'MN005', 'Robert', 'Brown', '1992-12-05', 'MALE', '+1 (555) 567-8901', 'robert.brown@email.com', '654 Maple Ave, City, State 12345', 'active');

-- Insert doctors
INSERT INTO doctors (id, user_id, employee_id, first_name, last_name, specialization, department_id, phone, email, status) VALUES
('d1', '2', 'EMP001', 'Sarah', 'Smith', 'Cardiologist', 'd1', '+1 (555) 987-6543', 'dr.smith@hospital.com', 'active'),
('d2', NULL, 'EMP002', 'Michael', 'Johnson', 'General Practitioner', 'd4', '+1 (555) 876-5432', 'dr.johnson@hospital.com', 'active'),
('d3', NULL, 'EMP003', 'Emily', 'Brown', 'Dermatologist', 'd3', '+1 (555) 765-4321', 'dr.brown@hospital.com', 'active'),
('d4', NULL, 'EMP004', 'Robert', 'Wilson', 'Orthopedic Surgeon', 'd3', '+1 (555) 654-3210', 'dr.wilson@hospital.com', 'active'),
('d5', NULL, 'EMP005', 'Lisa', 'Davis', 'Neurologist', 'd2', '+1 (555) 543-2109', 'dr.davis@hospital.com', 'active');

-- Insert appointments
INSERT INTO appointments (id, patient_id, doctor_id, date, time, type, status, notes, duration) VALUES
('a1', 'p1', 'd1', CURRENT_DATE, '10:30:00', 'Follow-up', 'confirmed', 'Follow-up for hypertension', 30),
('a2', 'p2', 'd2', CURRENT_DATE, '14:00:00', 'Routine Checkup', 'confirmed', 'Annual physical examination', 45),
('a3', 'p3', 'd3', CURRENT_DATE, '11:00:00', 'Consultation', 'completed', 'Skin examination', 30),
('a4', 'p4', 'd4', CURRENT_DATE + 1, '15:30:00', 'Follow-up', 'confirmed', 'Check progress after physical therapy', 30),
('a5', 'p5', 'd5', CURRENT_DATE + 1, '09:00:00', 'Consultation', 'pending', 'Headache evaluation', 45);

-- Insert medical records
INSERT INTO medical_records (id, patient_id, doctor_id, date, diagnosis, treatment, notes, follow_up_date) VALUES
('mr1', 'p1', 'd1', CURRENT_DATE - 14, 'Hypertension', 'Prescribed Lisinopril 10mg daily', 'Blood pressure: 140/90. Patient advised on diet and exercise.', CURRENT_DATE + 90),
('mr2', 'p2', 'd2', CURRENT_DATE - 30, 'Annual Physical', 'Routine blood work ordered', 'Overall health good. Recommended annual mammogram.', CURRENT_DATE + 365),
('mr3', 'p3', 'd3', CURRENT_DATE - 7, 'Eczema', 'Prescribed topical steroid cream', 'Affected areas: arms and neck. To be applied twice daily.', CURRENT_DATE + 14),
('mr4', 'p4', 'd4', CURRENT_DATE - 21, 'Osteoarthritis', 'Physical therapy and pain management', 'Knee pain improving with current regimen.', CURRENT_DATE + 30),
('mr5', 'p5', 'd5', CURRENT_DATE - 5, 'Migraine', 'Prescribed Sumatriptan', 'Patient experiences migraines 2-3 times per month.', CURRENT_DATE + 30);

-- Insert billing
INSERT INTO billing (id, patient_id, amount, description, status, due_date) VALUES
('b1', 'p1', 250.00, 'Cardiology Consultation', 'pending', CURRENT_DATE + 30),
('b2', 'p2', 180.00, 'Annual Physical', 'paid', NULL),
('b3', 'p3', 150.00, 'Dermatology Consultation', 'pending', CURRENT_DATE + 30),
('b4', 'p4', 200.00, 'Orthopedic Consultation', 'overdue', CURRENT_DATE - 15),
('b5', 'p5', 350.00, 'Neurology Consultation and Tests', 'pending', CURRENT_DATE + 30);

-- Insert medications
INSERT INTO medications (id, patient_id, doctor_id, medication_name, dosage, frequency, start_date, end_date, status) VALUES
('m1', 'p1', 'd1', 'Lisinopril', '10mg', 'Once daily', CURRENT_DATE - 14, CURRENT_DATE + 76, 'active'),
('m2', 'p2', 'd2', 'Multivitamin', '1 tablet', 'Once daily', CURRENT_DATE - 30, NULL, 'active'),
('m3', 'p3', 'd3', 'Hydrocortisone Cream', '1% strength', 'Twice daily', CURRENT_DATE - 7, CURRENT_DATE + 7, 'active'),
('m4', 'p4', 'd4', 'Ibuprofen', '600mg', 'As needed for pain', CURRENT_DATE - 21, CURRENT_DATE + 9, 'active'),
('m5', 'p5', 'd5', 'Sumatriptan', '50mg', 'As needed for migraine', CURRENT_DATE - 5, NULL, 'active');

-- Insert vitals
INSERT INTO vitals (id, patient_id, recorded_by, date_time, blood_pressure, temperature, pulse, respiratory_rate, oxygen_saturation, weight, height, pain_level, notes) VALUES
('v1', 'p1', '3', CURRENT_TIMESTAMP - 14, '140/90', 98.6, 72, 16, 98, 180, 70, 2, 'Patient appears stable'),
('v2', 'p2', '3', CURRENT_TIMESTAMP - 7, '120/80', 98.4, 68, 14, 99, 145, 64, 0, 'All vitals within normal range'),
('v3', 'p3', '3', CURRENT_TIMESTAMP - 3, '118/78', 98.8, 70, 15, 97, 175, 68, 3, 'Patient reports itching from eczema'),
('v4', 'p4', '3', CURRENT_TIMESTAMP - 10, '135/85', 98.7, 72, 16, 96, 160, 62, 4, 'Patient reports knee pain at 4/10'),
('v5', 'p5', '3', CURRENT_TIMESTAMP - 2, '125/82', 99.1, 76, 18, 97, 155, 66, 7, 'Patient experiencing migraine during visit');