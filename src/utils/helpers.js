import { format, parseISO, isValid } from 'date-fns';
import { VITAL_RANGES, PAIN_SCALE } from './constants';

// Date and Time Helpers
export const formatDate = (date, formatString = 'MMM dd, yyyy') => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, formatString) : '';
  } catch (error) {
    console.error('Date formatting error:', error);
    return '';
  }
};

export const formatTime = (time) => {
  if (!time) return '';
  
  try {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  } catch (error) {
    return time;
  }
};

export const getCurrentTime = () => {
  return new Date().toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

// String Helpers
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Number Helpers
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined) return '';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const formatNumber = (number, decimals = 0) => {
  if (number === null || number === undefined) return '';
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number);
};

// Validation Helpers
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Medical Helpers
export const getVitalStatus = (value, type) => {
  if (!value || !type) return 'normal';
  
  const numValue = parseFloat(value);
  
  switch (type) {
    case 'temperature':
      if (numValue >= VITAL_RANGES.TEMPERATURE.FEVER[0]) return 'high';
      if (numValue <= VITAL_RANGES.TEMPERATURE.HYPOTHERMIA[1]) return 'low';
      return 'normal';
      
    case 'pulse':
      if (numValue >= VITAL_RANGES.PULSE.TACHYCARDIA[0]) return 'high';
      if (numValue <= VITAL_RANGES.PULSE.BRADYCARDIA[1]) return 'low';
      return 'normal';
      
    case 'oxygen':
      if (numValue < VITAL_RANGES.OXYGEN_SATURATION.LOW[0]) return 'low';
      if (numValue < VITAL_RANGES.OXYGEN_SATURATION.CRITICAL[1]) return 'critical';
      return 'normal';
      
    default:
      return 'normal';
  }
};

export const getPainLevelInfo = (level) => {
  const painLevel = PAIN_SCALE.find(p => p.value === parseInt(level));
  return painLevel || PAIN_SCALE[0];
};

export const calculateAge = (birthDate) => {
  if (!birthDate) return '';
  
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const calculateBMI = (weight, height) => {
  if (!weight || !height) return null;
  
  // Assuming weight in lbs and height in inches
  const bmi = (weight / (height * height)) * 703;
  return Math.round(bmi * 10) / 10;
};

// Array Helpers
export const sortByDate = (array, dateField, ascending = true) => {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[dateField]);
    const dateB = new Date(b[dateField]);
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
};

export const filterByDateRange = (array, dateField, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return array.filter(item => {
    const itemDate = new Date(item[dateField]);
    return itemDate >= start && itemDate <= end;
  });
};

// Color Helpers
export const getStatusColor = (status, type = 'appointment') => {
  const colorMaps = {
    appointment: {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
      urgent: 'bg-red-100 text-red-800'
    },
    patient: {
      stable: 'bg-green-100 text-green-800',
      critical: 'bg-red-100 text-red-800',
      recovering: 'bg-blue-100 text-blue-800',
      discharged: 'bg-gray-100 text-gray-800'
    },
    medication: {
      pending: 'bg-yellow-100 text-yellow-800',
      administered: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      skipped: 'bg-gray-100 text-gray-800'
    },
    billing: {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    }
  };
  
  return colorMaps[type]?.[status] || 'bg-gray-100 text-gray-800';
};

// Local Storage Helpers
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// URL Helpers
export const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, value);
    }
  });
  
  return searchParams.toString();
};

export const parseQueryString = (queryString) => {
  const params = new URLSearchParams(queryString);
  const result = {};
  
  for (const [key, value] of params) {
    result[key] = value;
  }
  
  return result;
};

// File Helpers
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

// Debounce Helper
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Deep Clone Helper
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

// Error Handling Helper
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data?.message || 'An error occurred';
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};