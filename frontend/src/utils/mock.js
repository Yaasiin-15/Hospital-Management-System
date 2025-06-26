// This file provides mock data for when the backend is not available
// It's used to allow the frontend to function in a demo mode

// Mock data for patients
const patients = [
  {
    id: 'p1',
    name: 'John Doe',
    patientId: 'P001',
    age: 45,
    gender: 'Male',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@email.com',
    address: '123 Main St, City, State 12345',
    lastVisit: '2025-01-15',
    nextAppointment: '2025-02-15',
    condition: 'Hypertension',
    status: 'Active',
    insuranceProvider: 'Blue Cross Blue Shield'
  },
  {
    id: 'p2',
    name: 'Jane Smith',
    patientId: 'P002',
    age: 32,
    gender: 'Female',
    phone: '+1 (555) 234-5678',
    email: 'jane.smith@email.com',
    address: '456 Oak Ave, City, State 12345',
    lastVisit: '2025-01-10',
    nextAppointment: '2025-03-10',
    condition: 'Diabetes Type 2',
    status: 'Active',
    insuranceProvider: 'Aetna'
  },
  {
    id: 'p3',
    name: 'Mike Johnson',
    patientId: 'P003',
    age: 28,
    gender: 'Male',
    phone: '+1 (555) 345-6789',
    email: 'mike.johnson@email.com',
    address: '789 Pine St, City, State 12345',
    lastVisit: '2025-01-08',
    nextAppointment: '2025-01-22',
    condition: 'Post-surgery recovery',
    status: 'Recovering',
    insuranceProvider: 'Cigna'
  }
];

// Mock data for doctors
const doctors = [
  {
    id: 'd1',
    name: 'Dr. Sarah Smith',
    specialty: 'Cardiologist',
    department: 'Cardiology',
    email: 'dr.smith@hospital.com',
    phone: '+1 (555) 987-6543'
  },
  {
    id: 'd2',
    name: 'Dr. Michael Johnson',
    specialty: 'General Practitioner',
    department: 'General Medicine',
    email: 'dr.johnson@hospital.com',
    phone: '+1 (555) 876-5432'
  },
  {
    id: 'd3',
    name: 'Dr. Emily Brown',
    specialty: 'Dermatologist',
    department: 'Dermatology',
    email: 'dr.brown@hospital.com',
    phone: '+1 (555) 765-4321'
  }
];

// Mock data for appointments
const appointments = [
  {
    id: 'a1',
    patient: patients[0],
    doctor: doctors[0],
    date: '2025-01-15',
    time: '10:30 AM',
    type: 'Follow-up',
    status: 'confirmed',
    notes: 'Follow-up for hypertension'
  },
  {
    id: 'a2',
    patient: patients[1],
    doctor: doctors[1],
    date: '2025-01-22',
    time: '2:00 PM',
    type: 'Routine Checkup',
    status: 'confirmed',
    notes: 'Annual physical examination'
  },
  {
    id: 'a3',
    patient: patients[2],
    doctor: doctors[2],
    date: '2025-01-08',
    time: '11:00 AM',
    type: 'Consultation',
    status: 'completed',
    notes: 'Skin examination completed'
  }
];

// Mock data for medical records
const medicalRecords = [
  {
    id: 'mr1',
    patient: patients[0],
    doctor: doctors[0],
    date: '2025-01-01',
    diagnosis: 'Hypertension Follow-up',
    treatment: 'Prescribed Lisinopril 10mg daily',
    notes: 'Blood pressure: 140/90. Patient advised on diet and exercise.'
  },
  {
    id: 'mr2',
    patient: patients[1],
    doctor: doctors[1],
    date: '2025-01-10',
    diagnosis: 'Type 2 Diabetes',
    treatment: 'Metformin 500mg twice daily',
    notes: 'HbA1c: 7.2%. Discussed glucose monitoring and dietary changes.'
  },
  {
    id: 'mr3',
    patient: patients[2],
    doctor: doctors[2],
    date: '2025-01-08',
    diagnosis: 'Post-operative care',
    treatment: 'Wound care and antibiotics',
    notes: 'Appendectomy recovery progressing well. No signs of infection.'
  }
];

// Mock data for billing
const billingRecords = [
  {
    id: 'b1',
    patient: patients[0],
    date: '2025-01-01',
    amount: 250.00,
    description: 'Cardiology Consultation - Dr. Sarah Smith',
    status: 'pending',
    dueDate: '2025-01-31'
  },
  {
    id: 'b2',
    patient: patients[1],
    date: '2025-01-10',
    amount: 180.00,
    description: 'Annual Physical - Dr. Michael Johnson',
    status: 'paid',
    paidDate: '2025-01-15'
  },
  {
    id: 'b3',
    patient: patients[2],
    date: '2025-01-08',
    amount: 320.00,
    description: 'Dermatology Consultation - Dr. Emily Brown',
    status: 'overdue',
    dueDate: '2025-01-20'
  }
];

// Mock data for medications
const medications = [
  {
    id: 'm1',
    patient: patients[0],
    medication: 'Lisinopril 10mg',
    dosage: '1 tablet daily',
    prescribedBy: doctors[0],
    startDate: '2025-01-01',
    endDate: '2025-04-01'
  },
  {
    id: 'm2',
    patient: patients[1],
    medication: 'Metformin 500mg',
    dosage: '1 tablet twice daily',
    prescribedBy: doctors[1],
    startDate: '2025-01-10',
    endDate: '2025-04-10'
  },
  {
    id: 'm3',
    patient: patients[2],
    medication: 'Amoxicillin 500mg',
    dosage: '1 capsule three times daily',
    prescribedBy: doctors[2],
    startDate: '2025-01-08',
    endDate: '2025-01-15'
  }
];

// Mock departments
const departments = [
  {
    id: 'dept1',
    name: 'Cardiology',
    head: 'Dr. Sarah Smith',
    staffCount: 15,
    capacity: 30
  },
  {
    id: 'dept2',
    name: 'General Medicine',
    head: 'Dr. Michael Johnson',
    staffCount: 25,
    capacity: 50
  },
  {
    id: 'dept3',
    name: 'Dermatology',
    head: 'Dr. Emily Brown',
    staffCount: 8,
    capacity: 20
  },
  {
    id: 'dept4',
    name: 'Pediatrics',
    head: 'Dr. Robert Wilson',
    staffCount: 12,
    capacity: 25
  },
  {
    id: 'dept5',
    name: 'Emergency',
    head: 'Dr. Lisa Davis',
    staffCount: 30,
    capacity: 40
  }
];

// Mock users
const users = [
  {
    id: 'u1',
    username: 'admin',
    email: 'admin@hospital.com',
    role: 'ADMIN',
    status: 'active',
    createdAt: '2025-01-01'
  },
  {
    id: 'u2',
    username: 'dr.smith',
    email: 'dr.smith@hospital.com',
    role: 'DOCTOR',
    status: 'active',
    createdAt: '2025-01-02'
  },
  {
    id: 'u3',
    username: 'nurse.johnson',
    email: 'nurse.johnson@hospital.com',
    role: 'NURSE',
    status: 'active',
    createdAt: '2025-01-03'
  },
  {
    id: 'u4',
    username: 'receptionist',
    email: 'receptionist@hospital.com',
    role: 'RECEPTIONIST',
    status: 'active',
    createdAt: '2025-01-04'
  },
  {
    id: 'u5',
    username: 'patient',
    email: 'patient@hospital.com',
    role: 'PATIENT',
    status: 'active',
    createdAt: '2025-01-05'
  }
];

// Mock reports data
const reportsData = {
  appointmentStats: [
    { name: 'Mon', appointments: 24 },
    { name: 'Tue', appointments: 32 },
    { name: 'Wed', appointments: 28 },
    { name: 'Thu', appointments: 35 },
    { name: 'Fri', appointments: 42 },
    { name: 'Sat', appointments: 18 },
    { name: 'Sun', appointments: 12 },
  ],
  revenueData: [
    { name: 'Jan', revenue: 45000 },
    { name: 'Feb', revenue: 52000 },
    { name: 'Mar', revenue: 48000 },
    { name: 'Apr', revenue: 61000 },
    { name: 'May', revenue: 55000 },
    { name: 'Jun', revenue: 67000 },
  ],
  departmentData: [
    { name: 'Cardiology', value: 35, color: '#3B82F6' },
    { name: 'Neurology', value: 25, color: '#10B981' },
    { name: 'Orthopedics', value: 20, color: '#F59E0B' },
    { name: 'Pediatrics', value: 15, color: '#EF4444' },
    { name: 'Others', value: 5, color: '#8B5CF6' },
  ]
};

// Export all mock data
const mockData = {
  patients,
  doctors,
  appointments,
  medicalRecords,
  billingRecords,
  medications,
  departments,
  users,
  reportsData
};

export default mockData;