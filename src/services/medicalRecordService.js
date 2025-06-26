import api from './api';

export const medicalRecordService = {
  getAllMedicalRecords: async (params = {}) => {
    const response = await api.get('/medical-records', { params });
    return response.data;
  },

  getMedicalRecordById: async (id) => {
    const response = await api.get(`/medical-records/${id}`);
    return response.data;
  },

  createMedicalRecord: async (recordData) => {
    const response = await api.post('/medical-records', recordData);
    return response.data;
  },

  updateMedicalRecord: async (id, recordData) => {
    const response = await api.put(`/medical-records/${id}`, recordData);
    return response.data;
  },

  deleteMedicalRecord: async (id) => {
    const response = await api.delete(`/medical-records/${id}`);
    return response.data;
  },

  getMedicalRecordsByPatient: async (patientId, params = {}) => {
    const response = await api.get(`/medical-records/patient/${patientId}`, { params });
    return response.data;
  },

  getMedicalRecordsByDoctor: async (doctorId, params = {}) => {
    const response = await api.get(`/medical-records/doctor/${doctorId}`, { params });
    return response.data;
  },

  addAttachment: async (recordId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`/medical-records/${recordId}/attachments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};