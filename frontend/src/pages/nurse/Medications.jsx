import React, { useState } from 'react';
import { Search, Pill, Clock, CheckCircle, AlertTriangle, Plus } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table.jsx';

const Medications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [medications] = useState([
    {
      id: 1,
      patient: 'John Doe',
      room: '101',
      medication: 'Aspirin 100mg',
      dosage: '1 tablet',
      frequency: 'Once daily',
      time: '08:00 AM',
      status: 'pending',
      notes: 'Take with food'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      room: '102',
      medication: 'Insulin',
      dosage: '10 units',
      frequency: 'Before meals',
      time: '12:00 PM',
      status: 'overdue',
      notes: 'Check blood sugar first'
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      room: '103',
      medication: 'Antibiotics',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: '02:00 PM',
      status: 'completed',
      notes: 'Complete full course'
    },
    {
      id: 4,
      patient: 'Sarah Wilson',
      room: '104',
      medication: 'Pain medication',
      dosage: '2 tablets',
      frequency: 'As needed',
      time: '04:00 PM',
      status: 'pending',
      notes: 'Maximum 4 times daily'
    }
  ]);

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.room.includes(searchTerm);
    const matchesStatus = !filterStatus || med.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'skipped': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleStatusChange = (medicationId, newStatus) => {
    console.log(`Changing medication ${medicationId} status to ${newStatus}`);
  };

  const stats = [
    { name: 'Pending', value: filteredMedications.filter(m => m.status === 'pending').length, color: 'text-yellow-600' },
    { name: 'Completed', value: filteredMedications.filter(m => m.status === 'completed').length, color: 'text-green-600' },
    { name: 'Overdue', value: filteredMedications.filter(m => m.status === 'overdue').length, color: 'text-red-600' },
    { name: 'Total', value: filteredMedications.length, color: 'text-blue-600' }
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
              <div className="p-3 rounded-lg bg-gray-100">
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
                  placeholder="Search by patient, medication, or room..."
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
                <TableCell header>Dosage</TableCell>
                <TableCell header>Schedule</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Notes</TableCell>
                <TableCell header>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMedications.map((medication) => (
                <TableRow key={medication.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{medication.patient}</p>
                      <p className="text-sm text-gray-500">Room {medication.room}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Pill className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{medication.medication}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{medication.dosage}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{medication.frequency}</p>
                      <p className="text-sm text-gray-500">{medication.time}</p>
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
                    <span className="text-sm text-gray-600">{medication.notes}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {medication.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(medication.id, 'completed')}
                        >
                          Administer
                        </Button>
                      )}
                      {medication.status === 'overdue' && (
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleStatusChange(medication.id, 'completed')}
                        >
                          Give Now
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(medication.id, 'skipped')}
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
    </div>
  );
};

export default Medications;