import React, { useState } from 'react';
import { Search, Pill, Clock, CheckCircle, AlertTriangle, Plus, User, Calendar } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import toast from 'react-hot-toast';

const Medications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);

  const [medications, setMedications] = useState([
    {
      id: 1,
      patient: 'John Doe',
      patientId: 'P001',
      room: '101',
      medication: 'Aspirin 100mg',
      dosage: '1 tablet',
      frequency: 'Once daily',
      time: '08:00 AM',
      status: 'pending',
      notes: 'Take with food',
      prescribedBy: 'Dr. Smith',
      startDate: '2024-01-01',
      endDate: '2024-01-31'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      patientId: 'P002',
      room: '102',
      medication: 'Insulin',
      dosage: '10 units',
      frequency: 'Before meals',
      time: '12:00 PM',
      status: 'overdue',
      notes: 'Check blood sugar first',
      prescribedBy: 'Dr. Johnson',
      startDate: '2024-01-01',
      endDate: '2024-02-01'
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      patientId: 'P003',
      room: '103',
      medication: 'Antibiotics',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: '02:00 PM',
      status: 'completed',
      notes: 'Complete full course',
      prescribedBy: 'Dr. Brown',
      startDate: '2024-01-01',
      endDate: '2024-01-14'
    },
    {
      id: 4,
      patient: 'Sarah Wilson',
      patientId: 'P004',
      room: '104',
      medication: 'Pain medication',
      dosage: '2 tablets',
      frequency: 'As needed',
      time: '04:00 PM',
      status: 'pending',
      notes: 'Maximum 4 times daily',
      prescribedBy: 'Dr. Davis',
      startDate: '2024-01-01',
      endDate: '2024-01-15'
    },
    {
      id: 5,
      patient: 'Robert Brown',
      patientId: 'P005',
      room: '105',
      medication: 'Blood pressure medication',
      dosage: '5mg',
      frequency: 'Once daily',
      time: '09:00 AM',
      status: 'administered',
      notes: 'Monitor blood pressure',
      prescribedBy: 'Dr. Wilson',
      startDate: '2024-01-01',
      endDate: '2024-03-01'
    }
  ]);

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.room.includes(searchTerm) ||
                         med.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || med.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'administered': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'skipped': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'administered': return <CheckCircle className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleStatusChange = (medicationId, newStatus) => {
    setMedications(medications.map(med => 
      med.id === medicationId ? { ...med, status: newStatus } : med
    ));
    
    const medication = medications.find(med => med.id === medicationId);
    toast.success(`${medication.medication} for ${medication.patient} marked as ${newStatus}`);
  };

  const handleViewMedication = (medication) => {
    setSelectedMedication(medication);
    setIsModalOpen(true);
  };

  const stats = [
    { name: 'Pending', value: filteredMedications.filter(m => m.status === 'pending').length, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { name: 'Completed', value: filteredMedications.filter(m => m.status === 'completed').length, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Overdue', value: filteredMedications.filter(m => m.status === 'overdue').length, color: 'text-red-600', bg: 'bg-red-100' },
    { name: 'Total', value: filteredMedications.length, color: 'text-blue-600', bg: 'bg-blue-100' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Medication Management</h1>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Medication</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <Pill className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by patient, medication, room, or patient ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="administered">Administered</option>
                <option value="overdue">Overdue</option>
                <option value="skipped">Skipped</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Medications Table */}
      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell header>Patient</TableCell>
                <TableCell header>Medication</TableCell>
                <TableCell header>Dosage & Frequency</TableCell>
                <TableCell header>Schedule</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Prescribed By</TableCell>
                <TableCell header>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMedications.map((medication) => (
                <TableRow key={medication.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{medication.patient}</p>
                        <p className="text-sm text-gray-500">Room {medication.room} • {medication.patientId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Pill className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{medication.medication}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{medication.dosage}</p>
                      <p className="text-sm text-gray-500">{medication.frequency}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium">{medication.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(medication.status)}`}>
                        {getStatusIcon(medication.status)}
                        <span className="ml-1">{medication.status}</span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{medication.prescribedBy}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewMedication(medication)}
                      >
                        View
                      </Button>
                      {medication.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(medication.id, 'administered')}
                        >
                          Administer
                        </Button>
                      )}
                      {medication.status === 'overdue' && (
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleStatusChange(medication.id, 'administered')}
                        >
                          Give Now
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStatusChange(medication.id, 'skipped')}
                        className="text-gray-600"
                      >
                        Skip
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Medication Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Medication Details"
        size="lg"
      >
        {selectedMedication && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Patient Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedMedication.patient}</p>
                  <p><span className="font-medium">Patient ID:</span> {selectedMedication.patientId}</p>
                  <p><span className="font-medium">Room:</span> {selectedMedication.room}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Medication Details</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Medication:</span> {selectedMedication.medication}</p>
                  <p><span className="font-medium">Dosage:</span> {selectedMedication.dosage}</p>
                  <p><span className="font-medium">Frequency:</span> {selectedMedication.frequency}</p>
                  <p><span className="font-medium">Time:</span> {selectedMedication.time}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Prescription Details</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Prescribed By:</span> {selectedMedication.prescribedBy}</p>
                  <p><span className="font-medium">Start Date:</span> {new Date(selectedMedication.startDate).toLocaleDateString()}</p>
                  <p><span className="font-medium">End Date:</span> {new Date(selectedMedication.endDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Status & Notes</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedMedication.status)}`}>
                      {selectedMedication.status}
                    </span>
                  </p>
                  <p><span className="font-medium">Notes:</span> {selectedMedication.notes}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              {selectedMedication.status === 'pending' && (
                <Button onClick={() => {
                  handleStatusChange(selectedMedication.id, 'administered');
                  setIsModalOpen(false);
                }}>
                  Administer Now
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Medications;