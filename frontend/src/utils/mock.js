// Mock data for hospital management system

const users = [
  { id: 1, name: 'Admin User', email: 'admin@hospital.com', role: 'ADMIN' },
  { id: 2, name: 'Dr. Sarah Smith', email: 'doctor@hospital.com', role: 'DOCTOR' },
  { id: 3, name: 'Nurse Johnson', email: 'nurse@hospital.com', role: 'NURSE' },
  { id: 4, name: 'Front Desk', email: 'receptionist@hospital.com', role: 'RECEPTIONIST' },
  { id: 5, name: 'John Doe', email: 'patient@hospital.com', role: 'PATIENT' }
];

const patients = [
  { id: 1, name: 'John Doe', age: 45, gender: 'Male', phone: '555-123-4567', address: '123 Main St' },
  { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', phone: '555-234-5678', address: '456 Oak Ave' },
  { id: 3, name: 'Michael Johnson', age: 28, gender: 'Male', phone: '555-345-6789', address: '789 Pine Rd' }
];

const doctors = [
  { id: 1, name: 'Dr. Sarah Smith', specialization: 'Cardiology', phone: '555-987-6543' },
  { id: 2, name: 'Dr. Michael Brown', specialization: 'Neurology', phone: '555-876-5432' },
  { id: 3, name: 'Dr. Emily Wilson', specialization: 'Pediatrics', phone: '555-765-4321' }
];

const appointments = [
  { 
    id: 1, 
    patientId: 1, 
    patientName: 'John Doe',
    doctorId: 1, 
    doctorName: 'Dr. Sarah Smith',
    date: '2024-01-15', 
    time: '09:00', 
    status: 'confirmed',
    type: 'Follow-up',
    notes: 'Blood pressure check'
  },
  { 
    id: 2, 
    patientId: 2, 
    patientName: 'Jane Smith',
    doctorId: 1, 
    doctorName: 'Dr. Sarah Smith',
    date: '2024-01-15', 
    time: '10:00', 
    status: 'pending',
    type: 'Consultation',
    notes: 'New patient consultation'
  },
  { 
    id: 3, 
    patientId: 3, 
    patientName: 'Michael Johnson',
    doctorId: 1, 
    doctorName: 'Dr. Sarah Smith',
    date: '2024-01-16', 
    time: '14:00', 
    status: 'confirmed',
    type: 'Check-up',
    notes: 'Regular check-up'
  }
];

const medicalRecords = [
  {
    id: 1,
    patientId: 1,
    patientName: 'John Doe',
    doctorId: 1,
    doctorName: 'Dr. Sarah Smith',
    date: '2024-01-05',
    diagnosis: 'Hypertension',
    treatment: 'Prescribed Lisinopril 10mg daily',
    notes: 'Blood pressure 140/90. Follow up in 2 weeks.'
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Jane Smith',
    doctorId: 1,
    doctorName: 'Dr. Sarah Smith',
    date: '2024-01-08',
    diagnosis: 'Type 2 Diabetes',
    treatment: 'Prescribed Metformin 500mg twice daily',
    notes: 'HbA1c 7.2%. Referred to nutritionist.'
  }
];

const medications = [
  {
    id: 1,
    patientId: 1,
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2024-01-05',
    endDate: '2024-04-05'
  },
  {
    id: 2,
    patientId: 2,
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    startDate: '2024-01-08',
    endDate: '2024-07-08'
  }
];

// Combined mock data export
const mockData = {
  users,
  patients,
  doctors,
  appointments,
  medicalRecords,
  medications
};

export default mockData;