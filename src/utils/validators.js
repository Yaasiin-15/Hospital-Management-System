// Form Validation Utilities

export const required = (value) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return 'This field is required';
  }
  return null;
};

export const email = (value) => {
  if (!value) return null;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const phone = (value) => {
  if (!value) return null;
  
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  const digitsOnly = value.replace(/\D/g, '');
  
  if (!phoneRegex.test(value) || digitsOnly.length < 10) {
    return 'Please enter a valid phone number';
  }
  return null;
};

export const password = (value) => {
  if (!value) return null;
  
  if (value.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  
  if (!/(?=.*[a-z])/.test(value)) {
    return 'Password must contain at least one lowercase letter';
  }
  
  if (!/(?=.*[A-Z])/.test(value)) {
    return 'Password must contain at least one uppercase letter';
  }
  
  if (!/(?=.*\d)/.test(value)) {
    return 'Password must contain at least one number';
  }
  
  return null;
};

export const confirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return null;
};

export const minLength = (min) => (value) => {
  if (!value) return null;
  
  if (value.length < min) {
    return `Must be at least ${min} characters long`;
  }
  return null;
};

export const maxLength = (max) => (value) => {
  if (!value) return null;
  
  if (value.length > max) {
    return `Must be no more than ${max} characters long`;
  }
  return null;
};

export const minValue = (min) => (value) => {
  if (!value) return null;
  
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < min) {
    return `Must be at least ${min}`;
  }
  return null;
};

export const maxValue = (max) => (value) => {
  if (!value) return null;
  
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue > max) {
    return `Must be no more than ${max}`;
  }
  return null;
};

export const numeric = (value) => {
  if (!value) return null;
  
  if (isNaN(value)) {
    return 'Must be a valid number';
  }
  return null;
};

export const integer = (value) => {
  if (!value) return null;
  
  if (!Number.isInteger(parseFloat(value))) {
    return 'Must be a whole number';
  }
  return null;
};

export const positiveNumber = (value) => {
  if (!value) return null;
  
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return 'Must be a positive number';
  }
  return null;
};

export const date = (value) => {
  if (!value) return null;
  
  const dateObj = new Date(value);
  if (isNaN(dateObj.getTime())) {
    return 'Please enter a valid date';
  }
  return null;
};

export const futureDate = (value) => {
  if (!value) return null;
  
  const dateObj = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (dateObj <= today) {
    return 'Date must be in the future';
  }
  return null;
};

export const pastDate = (value) => {
  if (!value) return null;
  
  const dateObj = new Date(value);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  
  if (dateObj >= today) {
    return 'Date must be in the past';
  }
  return null;
};

export const age = (value) => {
  if (!value) return null;
  
  const birthDate = new Date(value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  if (age < 0 || age > 150) {
    return 'Please enter a valid birth date';
  }
  return null;
};

export const bloodPressure = (value) => {
  if (!value) return null;
  
  const bpRegex = /^\d{2,3}\/\d{2,3}$/;
  if (!bpRegex.test(value)) {
    return 'Please enter blood pressure in format: 120/80';
  }
  
  const [systolic, diastolic] = value.split('/').map(Number);
  
  if (systolic < 70 || systolic > 250) {
    return 'Systolic pressure must be between 70 and 250';
  }
  
  if (diastolic < 40 || diastolic > 150) {
    return 'Diastolic pressure must be between 40 and 150';
  }
  
  if (systolic <= diastolic) {
    return 'Systolic pressure must be higher than diastolic';
  }
  
  return null;
};

export const temperature = (value) => {
  if (!value) return null;
  
  const temp = parseFloat(value);
  if (isNaN(temp)) {
    return 'Please enter a valid temperature';
  }
  
  if (temp < 90 || temp > 110) {
    return 'Temperature must be between 90°F and 110°F';
  }
  
  return null;
};

export const pulse = (value) => {
  if (!value) return null;
  
  const pulseValue = parseInt(value);
  if (isNaN(pulseValue)) {
    return 'Please enter a valid pulse rate';
  }
  
  if (pulseValue < 30 || pulseValue > 200) {
    return 'Pulse rate must be between 30 and 200 bpm';
  }
  
  return null;
};

export const oxygenSaturation = (value) => {
  if (!value) return null;
  
  const oxygen = parseInt(value);
  if (isNaN(oxygen)) {
    return 'Please enter a valid oxygen saturation';
  }
  
  if (oxygen < 70 || oxygen > 100) {
    return 'Oxygen saturation must be between 70% and 100%';
  }
  
  return null;
};

export const weight = (value) => {
  if (!value) return null;
  
  const weightValue = parseFloat(value);
  if (isNaN(weightValue)) {
    return 'Please enter a valid weight';
  }
  
  if (weightValue < 1 || weightValue > 1000) {
    return 'Weight must be between 1 and 1000 lbs';
  }
  
  return null;
};

export const height = (value) => {
  if (!value) return null;
  
  const heightValue = parseFloat(value);
  if (isNaN(heightValue)) {
    return 'Please enter a valid height';
  }
  
  if (heightValue < 12 || heightValue > 96) {
    return 'Height must be between 12 and 96 inches';
  }
  
  return null;
};

export const painLevel = (value) => {
  if (!value) return null;
  
  const pain = parseInt(value);
  if (isNaN(pain)) {
    return 'Please select a pain level';
  }
  
  if (pain < 0 || pain > 10) {
    return 'Pain level must be between 0 and 10';
  }
  
  return null;
};

// Composite validators
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const fieldRules = Array.isArray(rules[field]) ? rules[field] : [rules[field]];
    const value = data[field];
    
    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break; // Stop at first error for this field
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Medical record validation
export const validateMedicalRecord = (data) => {
  return validateForm(data, {
    patientId: [required],
    diagnosis: [required, minLength(3)],
    treatment: [required, minLength(10)],
    date: [required, date]
  });
};

// Patient registration validation
export const validatePatientRegistration = (data) => {
  return validateForm(data, {
    firstName: [required, minLength(2)],
    lastName: [required, minLength(2)],
    email: [required, email],
    phone: [required, phone],
    dateOfBirth: [required, date, age],
    address: [required, minLength(10)]
  });
};

// Appointment validation
export const validateAppointment = (data) => {
  return validateForm(data, {
    patientId: [required],
    doctorId: [required],
    date: [required, date, futureDate],
    time: [required],
    type: [required]
  });
};

// User validation
export const validateUser = (data, isEdit = false) => {
  const rules = {
    username: [required, minLength(3)],
    email: [required, email],
    role: [required],
    password: isEdit ? [] : [required, password]
  };
  
  return validateForm(data, rules);
};

// Vitals validation
export const validateVitals = (data) => {
  return validateForm(data, {
    bloodPressureSystolic: [required, numeric, minValue(70), maxValue(250)],
    bloodPressureDiastolic: [required, numeric, minValue(40), maxValue(150)],
    temperature: [required, temperature],
    pulse: [required, pulse],
    oxygen: [required, oxygenSaturation]
  });
};