import api from './api';

export const doctorService = {
  getAllDoctors: async (params = {}) => {
    const response = await api.get('/doctors', { params });
    return response.data;
  },

  getDoctorById: async (id) => {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  },

  getDoctorSchedule: async (id, date) => {
    const response = await api.get(`/doctors/${id}/schedule`, { 
      params: { date } 
    });
    return response.data;
  },

  updateDoctorSchedule: async (id, scheduleData) => {
    const response = await api.put(`/doctors/${id}/schedule`, scheduleData);
    return response.data;
  },

  getDoctorAppointments: async (id, params = {}) => {
    const response = await api.get(`/doctors/${id}/appointments`, { params });
    return response.data;
  },

  getDoctorPatients: async (id, params = {}) => {
    const response = await api.get(`/doctors/${id}/patients`, { params });
    return response.data;
  },

  getDoctorAvailability: async (id, date) => {
    const response = await api.get(`/doctors/${id}/availability`, {
      params: { date }
    });
    return response.data;
  }
};