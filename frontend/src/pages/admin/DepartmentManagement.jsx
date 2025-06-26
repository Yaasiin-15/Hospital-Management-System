import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Users, MapPin, Phone, Mail } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import toast from 'react-hot-toast';

const DepartmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'Emergency Medicine',
      code: 'EM',
      head: 'Dr. Sarah Johnson',
      location: 'Ground Floor, Wing A',
      phone: '+1 (555) 123-4567',
      email: 'emergency@hospital.com',
      staffCount: 25,
      status: 'active',
      description: 'Emergency and trauma care services',
      capacity: 50,
      currentPatients: 12
    },
    {
      id: 2,
      name: 'Cardiology',
      code: 'CARD',
      head: 'Dr. Michael Smith',
      location: '2nd Floor, Wing B',
      phone: '+1 (555) 234-5678',
      email: 'cardiology@hospital.com',
      staffCount: 18,
      status: 'active',
      description: 'Heart and cardiovascular care',
      capacity: 30,
      currentPatients: 22
    },
    {
      id: 3,
      name: 'Pediatrics',
      code: 'PED',
      head: 'Dr. Emily Brown',
      location: '3rd Floor, Wing C',
      phone: '+1 (555) 345-6789',
      email: 'pediatrics@hospital.com',
      staffCount: 15,
      status: 'active',
      description: 'Children and adolescent care',
      capacity: 25,
      currentPatients: 8
    },
    {
      id: 4,
      name: 'Orthopedics',
      code: 'ORTHO',
      head: 'Dr. Robert Wilson',
      location: '1st Floor, Wing D',
      phone: '+1 (555) 456-7890',
      email: 'orthopedics@hospital.com',
      staffCount: 12,
      status: 'active',
      description: 'Bone, joint, and muscle disorders',
      capacity: 20,
      currentPatients: 15
    },
    {
      id: 5,
      name: 'Neurology',
      code: 'NEURO',
      head: 'Dr. Lisa Davis',
      location: '4th Floor, Wing A',
      phone: '+1 (555) 567-8901',
      email: 'neurology@hospital.com',
      staffCount: 10,
      status: 'maintenance',
      description: 'Brain and nervous system disorders',
      capacity: 15,
      currentPatients: 5
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    head: '',
    location: '',
    phone: '',
    email: '',
    description: '',
    capacity: '',
    status: 'active'
  });

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDepartment = () => {
    setEditingDepartment(null);
    setFormData({
      name: '',
      code: '',
      head: '',
      location: '',
      phone: '',
      email: '',
      description: '',
      capacity: '',
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const handleEditDepartment = (department) => {
    setEditingDepartment(department);
    setFormData({
      name: department.name,
      code: department.code,
      head: department.head,
      location: department.location,
      phone: department.phone,
      email: department.email,
      description: department.description,
      capacity: department.capacity.toString(),
      status: department.status
    });
    setIsModalOpen(true);
  };

  const handleDeleteDepartment = (departmentId) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dept => dept.id !== departmentId));
      toast.success('Department deleted successfully');
    }
  };

  const handleSaveDepartment = (e) => {
    e.preventDefault();
    
    if (editingDepartment) {
      setDepartments(departments.map(dept =>
        dept.id === editingDepartment.id
          ? {
              ...dept,
              ...formData,
              capacity: parseInt(formData.capacity),
              staffCount: dept.staffCount,
              currentPatients: dept.currentPatients
            }
          : dept
      ));
      toast.success('Department updated successfully');
    } else {
      const newDepartment = {
        id: Date.now(),
        ...formData,
        capacity: parseInt(formData.capacity),
        staffCount: 0,
        currentPatients: 0
      };
      setDepartments([...departments, newDepartment]);
      toast.success('Department created successfully');
    }
    
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOccupancyColor = (occupancy) => {
    if (occupancy >= 90) return 'text-red-600';
    if (occupancy >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const stats = [
    { 
      name: 'Total Departments', 
      value: departments.length, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100' 
    },
    { 
      name: 'Active Departments', 
      value: departments.filter(d => d.status === 'active').length, 
      color: 'text-green-600', 
      bg: 'bg-green-100' 
    },
    { 
      name: 'Total Staff', 
      value: departments.reduce((sum, d) => sum + d.staffCount, 0), 
      color: 'text-purple-600', 
      bg: 'bg-purple-100' 
    },
    { 
      name: 'Total Capacity', 
      value: departments.reduce((sum, d) => sum + d.capacity, 0), 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-100' 
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Department Management</h1>
        <Button onClick={handleAddDepartment} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Department</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <Users className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card>
        <div className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search departments by name, code, or head..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Departments Table */}
      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell header>Department</TableCell>
                <TableCell header>Head</TableCell>
                <TableCell header>Location</TableCell>
                <TableCell header>Contact</TableCell>
                <TableCell header>Staff</TableCell>
                <TableCell header>Occupancy</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.map((department) => {
                const occupancy = Math.round((department.currentPatients / department.capacity) * 100);
                
                return (
                  <TableRow key={department.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{department.name}</p>
                        <p className="text-sm text-gray-500">{department.code}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{department.head}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{department.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-xs">{department.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-xs">{department.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{department.staffCount}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <span className={`text-sm font-medium ${getOccupancyColor(occupancy)}`}>
                          {occupancy}%
                        </span>
                        <p className="text-xs text-gray-500">
                          {department.currentPatients}/{department.capacity}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(department.status)}`}>
                        {department.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditDepartment(department)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteDepartment(department.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add/Edit Department Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDepartment ? 'Edit Department' : 'Add New Department'}
        size="lg"
      >
        <form onSubmit={handleSaveDepartment} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Department Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Department Code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Department Head"
              name="head"
              value={formData.head}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Capacity"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleInputChange}
              required
            />
          </div>

          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingDepartment ? 'Update Department' : 'Create Department'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DepartmentManagement;