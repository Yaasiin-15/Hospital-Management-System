import api from './api';

export const appointmentService = {
  getAllAppointments: async (params = {}) => {
    const response = await api.get('/appointments', { params });
    return response.data;
  },

  getAppointmentById: async (id) => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },

  createAppointment: async (appointmentData) => {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  },

  updateAppointment: async (id, appointmentData) => {
    const response = await api.put(`/appointments/${id}`, appointmentData);
    return response.data;
  },

  cancelAppointment: async (id) => {
    const response = await api.patch(`/appointments/${id}/cancel`);
    return response.data;
  },

  getAppointmentsByDoctor: async (doctorId, params = {}) => {
    const response = await api.get(`/appointments/doctor/${doctorId}`, { params });
    return response.data;
  },

  getAppointmentsByPatient: async (patientId, params = {}) => {
    const response = await api.get(`/appointments/patient/${patientId}`, { params });
    return response.data;
  }
};