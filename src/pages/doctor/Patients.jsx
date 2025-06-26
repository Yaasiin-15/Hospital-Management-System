import React, { useState } from 'react';
import { Search, User, Phone, Mail, Calendar, FileText, Plus } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table';

const DoctorPatients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [patients] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@email.com',
      lastVisit: '2024-01-15',
      condition: 'Hypertension',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 32,
      gender: 'Female',
      phone: '+1 (555) 234-5678',
      email: 'jane.smith@email.com',
      lastVisit: '2024-01-10',
      condition: 'Diabetes Type 2',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      age: 28,
      gender: 'Male',
      phone: '+1 (555) 345-6789',
      email: 'mike.johnson@email.com',
      lastVisit: '2024-01-08',
      condition: 'Post-surgery recovery',
      status: 'Recovering'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      age: 55,
      gender: 'Female',
      phone: '+1 (555) 456-7890',
      email: 'sarah.wilson@email.com',
      lastVisit: '2024-01-12',
      condition: 'Arthritis',
      status: 'Active'
    }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Recovering': return 'bg-blue-100 text-blue-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Discharged': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Patient</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search patients by name or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="recovering">Recovering</option>
                <option value="critical">Critical</option>
                <option value="discharged">Discharged</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Patients Table */}
      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell header>Patient</TableCell>
                <TableCell header>Age/Gender</TableCell>
                <TableCell header>Contact</TableCell>
                <TableCell header>Last Visit</TableCell>
                <TableCell header>Condition</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{patient.name}</p>
                        <p className="text-sm text-gray-500">ID: {patient.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{patient.age} years</p>
                      <p className="text-sm text-gray-500">{patient.gender}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{patient.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{patient.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{new Date(patient.lastVisit).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium">{patient.condition}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewPatient(patient)}
                      >
                        View
                      </Button>
                      <Button size="sm" variant="ghost">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Patient Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Patient Details"
        size="lg"
      >
        {selectedPatient && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900">Personal Information</h4>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedPatient.name}</p>
                  <p><span className="font-medium">Age:</span> {selectedPatient.age}</p>
                  <p><span className="font-medium">Gender:</span> {selectedPatient.gender}</p>
                  <p><span className="font-medium">Phone:</span> {selectedPatient.phone}</p>
                  <p><span className="font-medium">Email:</span> {selectedPatient.email}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Medical Information</h4>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Condition:</span> {selectedPatient.condition}</p>
                  <p><span className="font-medium">Status:</span> {selectedPatient.status}</p>
                  <p><span className="font-medium">Last Visit:</span> {new Date(selectedPatient.lastVisit).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button>
                View Medical Records
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DoctorPatients;