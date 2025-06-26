// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me'
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id) => `/users/${id}`,
    BY_ROLE: (role) => `/users/role/${role}`
  },
  PATIENTS: {
    BASE: '/patients',
    BY_ID: (id) => `/patients/${id}`,
    MEDICAL_HISTORY: (id) => `/patients/${id}/medical-history`,
    APPOINTMENTS: (id) => `/patients/${id}/appointments`
  },
  DOCTORS: {
    BASE: '/doctors',
    BY_ID: (id) => `/doctors/${id}`,
    SCHEDULE: (id) => `/doctors/${id}/schedule`,
    APPOINTMENTS: (id) => `/doctors/${id}/appointments`
  },
  APPOINTMENTS: {
    BASE: '/appointments',
    BY_ID: (id) => `/appointments/${id}`,
    BY_DATE: (date) => `/appointments/date/${date}`,
    CANCEL: (id) => `/appointments/${id}/cancel`
  },
  MEDICAL_RECORDS: {
    BASE: '/medical-records',
    BY_ID: (id) => `/medical-records/${id}`,
    BY_PATIENT: (patientId) => `/medical-records/patient/${patientId}`
  },
  BILLING: {
    BASE: '/billing',
    BY_ID: (id) => `/billing/${id}`,
    BY_PATIENT: (patientId) => `/billing/patient/${patientId}`,
    PAY: (id) => `/billing/${id}/pay`
  }
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  DOCTOR: 'DOCTOR',
  NURSE: 'NURSE',
  RECEPTIONIST: 'RECEPTIONIST',
  PATIENT: 'PATIENT'
};

// Appointment Status
export const APPOINTMENT_STATUS = {
  SCHEDULED: 'SCHEDULED',
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW'
};

// Appointment Types
export const APPOINTMENT_TYPES = {
  CONSULTATION: 'CONSULTATION',
  FOLLOW_UP: 'FOLLOW_UP',
  EMERGENCY: 'EMERGENCY',
  ROUTINE_CHECKUP: 'ROUTINE_CHECKUP'
};

// Billing Status
export const BILLING_STATUS = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  OVERDUE: 'OVERDUE',
  CANCELLED: 'CANCELLED'
};

// Patient Status
export const PATIENT_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DISCHARGED: 'DISCHARGED',
  CRITICAL: 'CRITICAL',
  STABLE: 'STABLE',
  RECOVERING: 'RECOVERING'
};

// Medication Status
export const MEDICATION_STATUS = {
  PENDING: 'PENDING',
  ADMINISTERED: 'ADMINISTERED',
  COMPLETED: 'COMPLETED',
  OVERDUE: 'OVERDUE',
  SKIPPED: 'SKIPPED'
};

// Vital Signs Ranges
export const VITAL_RANGES = {
  BLOOD_PRESSURE: {
    NORMAL: { systolic: [90, 120], diastolic: [60, 80] },
    HIGH: { systolic: [140, 180], diastolic: [90, 110] },
    LOW: { systolic: [70, 90], diastolic: [40, 60] }
  },
  TEMPERATURE: {
    NORMAL: [97.0, 99.5],
    FEVER: [100.4, 104.0],
    HYPOTHERMIA: [95.0, 97.0]
  },
  PULSE: {
    NORMAL: [60, 100],
    TACHYCARDIA: [100, 150],
    BRADYCARDIA: [40, 60]
  },
  OXYGEN_SATURATION: {
    NORMAL: [95, 100],
    LOW: [90, 95],
    CRITICAL: [0, 90]
  }
};

// Time Slots
export const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
];

// Days of Week
export const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

// Departments
export const DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Dermatology',
  'Psychiatry',
  'Radiology',
  'Emergency Medicine',
  'Internal Medicine',
  'Surgery'
];

// Insurance Providers
export const INSURANCE_PROVIDERS = [
  'Blue Cross Blue Shield',
  'Aetna',
  'Cigna',
  'UnitedHealth',
  'Humana',
  'Kaiser Permanente',
  'Anthem',
  'Medicare',
  'Medicaid',
  'Self-Pay'
];

// Pain Scale
export const PAIN_SCALE = [
  { value: 0, label: 'No Pain', color: 'text-green-600' },
  { value: 1, label: 'Mild', color: 'text-green-500' },
  { value: 2, label: 'Mild', color: 'text-green-400' },
  { value: 3, label: 'Mild', color: 'text-yellow-500' },
  { value: 4, label: 'Moderate', color: 'text-yellow-600' },
  { value: 5, label: 'Moderate', color: 'text-orange-500' },
  { value: 6, label: 'Moderate', color: 'text-orange-600' },
  { value: 7, label: 'Severe', color: 'text-red-500' },
  { value: 8, label: 'Severe', color: 'text-red-600' },
  { value: 9, label: 'Severe', color: 'text-red-700' },
  { value: 10, label: 'Worst Pain', color: 'text-red-800' }
];

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  THEME: 'theme',
  LANGUAGE: 'language'
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  TIME: 'HH:mm',
  DATETIME: 'MMM dd, yyyy HH:mm',
  FULL: 'EEEE, MMMM dd, yyyy'
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100]
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.pdf', '.txt']
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Theme Colors
export const THEME_COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#6B7280',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6'
};