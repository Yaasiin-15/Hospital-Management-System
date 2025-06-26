import { 
  format, 
  parseISO, 
  isValid, 
  addDays, 
  subDays, 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  isToday,
  isTomorrow,
  isYesterday,
  isSameDay,
  isBefore,
  isAfter
} from 'date-fns';

// Format dates for display
export const formatDisplayDate = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    
    if (isToday(dateObj)) return 'Today';
    if (isTomorrow(dateObj)) return 'Tomorrow';
    if (isYesterday(dateObj)) return 'Yesterday';
    
    return format(dateObj, 'MMM dd, yyyy');
  } catch (error) {
    console.error('Date formatting error:', error);
    return '';
  }
};

export const formatTime = (time) => {
  if (!time) return '';
  
  try {
    // Handle both "HH:mm" and Date objects
    if (typeof time === 'string') {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } else {
      return format(time, 'h:mm a');
    }
  } catch (error) {
    return time;
  }
};

export const formatDateTime = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    
    return format(dateObj, 'MMM dd, yyyy h:mm a');
  } catch (error) {
    return '';
  }
};

// Get relative time
export const getRelativeTime = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    
    const now = new Date();
    const diffMinutes = differenceInMinutes(now, dateObj);
    const diffHours = differenceInHours(now, dateObj);
    const diffDays = differenceInDays(now, dateObj);
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return formatDisplayDate(dateObj);
  } catch (error) {
    return '';
  }
};

// Date calculations
export const addBusinessDays = (date, days) => {
  let result = new Date(date);
  let addedDays = 0;
  
  while (addedDays < days) {
    result = addDays(result, 1);
    if (result.getDay() !== 0 && result.getDay() !== 6) { // Not weekend
      addedDays++;
    }
  }
  
  return result;
};

export const getWeekRange = (date = new Date()) => {
  return {
    start: startOfWeek(date, { weekStartsOn: 1 }), // Monday
    end: endOfWeek(date, { weekStartsOn: 1 })
  };
};

export const getMonthRange = (date = new Date()) => {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date)
  };
};

// Date validation
export const isValidDate = (date) => {
  if (!date) return false;
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj);
  } catch (error) {
    return false;
  }
};

export const isFutureDate = (date) => {
  if (!isValidDate(date)) return false;
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isAfter(dateObj, new Date());
};

export const isPastDate = (date) => {
  if (!isValidDate(date)) return false;
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isBefore(dateObj, new Date());
};

// Age calculation
export const calculateAge = (birthDate) => {
  if (!birthDate) return 0;
  
  try {
    const birth = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate;
    if (!isValid(birth)) return 0;
    
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  } catch (error) {
    return 0;
  }
};

// Time slot generation
export const generateTimeSlots = (startTime = '08:00', endTime = '18:00', interval = 30) => {
  const slots = [];
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  let currentHour = startHour;
  let currentMinute = startMinute;
  
  while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
    const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
    slots.push(timeString);
    
    currentMinute += interval;
    if (currentMinute >= 60) {
      currentHour += Math.floor(currentMinute / 60);
      currentMinute = currentMinute % 60;
    }
  }
  
  return slots;
};

// Date range utilities
export const getDateRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);
  
  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  
  return dates;
};

export const isDateInRange = (date, startDate, endDate) => {
  const checkDate = typeof date === 'string' ? parseISO(date) : date;
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  
  return checkDate >= start && checkDate <= end;
};

// Working hours utilities
export const isWorkingHour = (time, workingHours = { start: '08:00', end: '18:00' }) => {
  const [hour, minute] = time.split(':').map(Number);
  const [startHour, startMinute] = workingHours.start.split(':').map(Number);
  const [endHour, endMinute] = workingHours.end.split(':').map(Number);
  
  const timeInMinutes = hour * 60 + minute;
  const startInMinutes = startHour * 60 + startMinute;
  const endInMinutes = endHour * 60 + endMinute;
  
  return timeInMinutes >= startInMinutes && timeInMinutes < endInMinutes;
};

export const isWorkingDay = (date, workingDays = [1, 2, 3, 4, 5]) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return workingDays.includes(dateObj.getDay());
};

// Appointment scheduling utilities
export const getNextAvailableDate = (excludeDates = [], workingDays = [1, 2, 3, 4, 5]) => {
  let date = new Date();
  date = addDays(date, 1); // Start from tomorrow
  
  while (true) {
    if (isWorkingDay(date, workingDays) && !excludeDates.some(excludeDate => isSameDay(date, excludeDate))) {
      return date;
    }
    date = addDays(date, 1);
  }
};

export const getAvailableTimeSlots = (date, bookedSlots = [], workingHours = { start: '08:00', end: '18:00' }, interval = 30) => {
  const allSlots = generateTimeSlots(workingHours.start, workingHours.end, interval);
  return allSlots.filter(slot => !bookedSlots.includes(slot));
};

// Date formatting for inputs
export const formatDateForInput = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    
    return format(dateObj, 'yyyy-MM-dd');
  } catch (error) {
    return '';
  }
};

export const formatTimeForInput = (time) => {
  if (!time) return '';
  
  try {
    if (typeof time === 'string' && time.includes(':')) {
      return time;
    }
    
    const timeObj = typeof time === 'string' ? parseISO(time) : time;
    if (!isValid(timeObj)) return '';
    
    return format(timeObj, 'HH:mm');
  } catch (error) {
    return '';
  }
};

// Timezone utilities
export const getCurrentTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const formatDateInTimezone = (date, timezone = getCurrentTimezone()) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    
    
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(dateObj);
  } catch (error) {
    return '';
  }
};