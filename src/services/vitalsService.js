import api from './api';

export const vitalsService = {
  getAllVitals: async (params = {}) => {
    const response = await api.get('/vitals', { params });
    return response.data;
  },

  getVitalsByPatient: async (patientId, params = {}) => {
    const response = await api.get(`/vitals/patient/${patientId}`, { params });
    return response.data;
  },

  createVitalsRecord: async (vitalsData) => {
    const response = await api.post('/vitals', vitalsData);
    return response.data;
  },

  updateVitalsRecord: async (id, vitalsData) => {
    const response = await api.put(`/vitals/${id}`, vitalsData);
    return response.data;
  },

  deleteVitalsRecord: async (id) => {
    const response = await api.delete(`/vitals/${id}`);
    return response.data;
  },

  getVitalsHistory: async (patientId, dateRange) => {
    const response = await api.get(`/vitals/patient/${patientId}/history`, {
      params: dateRange
    });
    return response.data;
  },

  getVitalsTrends: async (patientId, type, period = '7d') => {
    const response = await api.get(`/vitals/patient/${patientId}/trends`, {
      params: { type, period }
    });
    return response.data;
  }
};