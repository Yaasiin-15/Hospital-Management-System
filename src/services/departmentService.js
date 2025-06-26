import api from './api';

export const departmentService = {
  getAllDepartments: async (params = {}) => {
    const response = await api.get('/departments', { params });
    return response.data;
  },

  getDepartmentById: async (id) => {
    const response = await api.get(`/departments/${id}`);
    return response.data;
  },

  createDepartment: async (departmentData) => {
    const response = await api.post('/departments', departmentData);
    return response.data;
  },

  updateDepartment: async (id, departmentData) => {
    const response = await api.put(`/departments/${id}`, departmentData);
    return response.data;
  },

  deleteDepartment: async (id) => {
    const response = await api.delete(`/departments/${id}`);
    return response.data;
  },

  getDepartmentStaff: async (id) => {
    const response = await api.get(`/departments/${id}/staff`);
    return response.data;
  },

  getDepartmentStatistics: async (id, period = '30d') => {
    const response = await api.get(`/departments/${id}/statistics`, {
      params: { period }
    });
    return response.data;
  },

  updateDepartmentStatus: async (id, status) => {
    const response = await api.patch(`/departments/${id}/status`, { status });
    return response.data;
  }
};