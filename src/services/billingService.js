import api from './api';

export const billingService = {
  getAllBills: async (params = {}) => {
    const response = await api.get('/billing', { params });
    return response.data;
  },

  getBillById: async (id) => {
    const response = await api.get(`/billing/${id}`);
    return response.data;
  },

  createBill: async (billData) => {
    const response = await api.post('/billing', billData);
    return response.data;
  },

  updateBill: async (id, billData) => {
    const response = await api.put(`/billing/${id}`, billData);
    return response.data;
  },

  deleteBill: async (id) => {
    const response = await api.delete(`/billing/${id}`);
    return response.data;
  },

  getBillsByPatient: async (patientId, params = {}) => {
    const response = await api.get(`/billing/patient/${patientId}`, { params });
    return response.data;
  },

  processBillPayment: async (id, paymentData) => {
    const response = await api.post(`/billing/${id}/pay`, paymentData);
    return response.data;
  },

  generateInvoice: async (id) => {
    const response = await api.get(`/billing/${id}/invoice`, {
      responseType: 'blob'
    });
    return response.data;
  },

  sendBillReminder: async (id) => {
    const response = await api.post(`/billing/${id}/reminder`);
    return response.data;
  }
};