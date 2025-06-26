import api from './api';

export const medicationService = {
  getAllMedications: async (params = {}) => {
    const response = await api.get('/medications', { params });
    return response.data;
  },

  getMedicationById: async (id) => {
    const response = await api.get(`/medications/${id}`);
    return response.data;
  },

  createMedication: async (medicationData) => {
    const response = await api.post('/medications', medicationData);
    return response.data;
  },

  updateMedication: async (id, medicationData) => {
    const response = await api.put(`/medications/${id}`, medicationData);
    return response.data;
  },

  deleteMedication: async (id) => {
    const response = await api.delete(`/medications/${id}`);
    return response.data;
  },

  getMedicationsByPatient: async (patientId, params = {}) => {
    const response = await api.get(`/medications/patient/${patientId}`, { params });
    return response.data;
  },

  updateMedicationStatus: async (id, status, notes = '') => {
    const response = await api.patch(`/medications/${id}/status`, { 
      status, 
      notes,
      timestamp: new Date().toISOString()
    });
    return response.data;
  },

  getMedicationSchedule: async (date, nurseId) => {
    const response = await api.get('/medications/schedule', {
      params: { date, nurseId }
    });
    return response.data;
  },

  markMedicationAdministered: async (id, administeredBy, notes = '') => {
    const response = await api.post(`/medications/${id}/administer`, {
      administeredBy,
      notes,
      timestamp: new Date().toISOString()
    });
    return response.data;
  }
};