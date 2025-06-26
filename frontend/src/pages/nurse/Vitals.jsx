import React, { useState } from 'react';
import { Search, Heart, Thermometer, Activity, Plus, TrendingUp } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Modal from '../../components/ui/Modal.jsx';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table.jsx';

const Vitals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [patients] = useState([
    {
      id: 1,
      name: 'John Doe',
      room: '101',
      lastCheck: '2 hours ago',
      vitals: {
        bloodPressure: '120/80',
        temperature: '98.6°F',
        pulse: '72',
        oxygen: '98%',
        respiratoryRate: '16'
      },
      status: 'normal',
      nextCheck: '6:00 PM'
    },
    {
      id: 2,
      name: 'Jane Smith',
      room: '102',
      lastCheck: '30 min ago',
      vitals: {
        bloodPressure: '140/90',
        temperature: '101.2°F',
        pulse: '88',
        oxygen: '94%',
        respiratoryRate: '20'
      },
      status: 'abnormal',
      nextCheck: '4:00 PM'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      room: '103',
      lastCheck: '1 hour ago',
      vitals: {
        bloodPressure: '118/75',
        temperature: '98.4°F',
        pulse: '68',
        oxygen: '99%',
        respiratoryRate: '14'
      },
      status: 'normal',
      nextCheck: '8:00 PM'
    }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.room.includes(searchTerm)
  );

  const handleAddVitals = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'abnormal': return 'bg-red-100 text-red-800';
      case 'critical': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVitalStatus = (vital, type) => {
    // Simple logic for demonstration
    switch (type) {
      case 'temperature':
        const temp = parseFloat(vital);
        if (temp > 100.4) return 'high';
        if (temp < 97) return 'low';
        return 'normal';
      case 'oxygen':
        const oxygen = parseInt(vital);
        if (oxygen < 95) return 'low';
        return 'normal';
      default:
        return 'normal';
    }
  };

  const getVitalColor = (status) => {
    switch (status) {
      case 'high': return 'text-red-600';
      case 'low': return 'text-blue-600';
      case 'normal': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Vital Signs Monitoring</h1>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Record Vitals</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Normal Vitals</p>
              <p className="text-2xl font-bold text-gray-900">
                {patients.filter(p => p.status === 'normal').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-100">
              <Thermometer className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Abnormal Vitals</p>
              <p className="text-2xl font-bold text-gray-900">
                {patients.filter(p => p.status === 'abnormal').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Due for Check</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <div className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search patients by name or room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Vitals Table */}
      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell header>Patient</TableCell>
                <TableCell header>Blood Pressure</TableCell>
                <TableCell header>Temperature</TableCell>
                <TableCell header>Pulse</TableCell>
                <TableCell header>Oxygen</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Last Check</TableCell>
                <TableCell header>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-500">Room {patient.room}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{patient.vitals.bloodPressure}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getVitalColor(getVitalStatus(patient.vitals.temperature, 'temperature'))}`}>
                      {patient.vitals.temperature}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{patient.vitals.pulse} bpm</span>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getVitalColor(getVitalStatus(patient.vitals.oxygen, 'oxygen'))}`}>
                      {patient.vitals.oxygen}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{patient.lastCheck}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleAddVitals(patient)}
                      >
                        Record
                      </Button>
                      <Button size="sm" variant="outline">
                        History
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add Vitals Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record Vital Signs"
        size="md"
      >
        {selectedPatient && (
          <form className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="font-medium text-gray-900">{selectedPatient.name}</h4>
              <p className="text-sm text-gray-500">Room {selectedPatient.room}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Blood Pressure"
                placeholder="120/80"
                defaultValue={selectedPatient.vitals.bloodPressure}
              />
              <Input
                label="Temperature (°F)"
                placeholder="98.6"
                defaultValue={selectedPatient.vitals.temperature}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Pulse (bpm)"
                placeholder="72"
                defaultValue={selectedPatient.vitals.pulse}
              />
              <Input
                label="Oxygen Saturation (%)"
                placeholder="98"
                defaultValue={selectedPatient.vitals.oxygen}
              />
            </div>
            
            <Input
              label="Respiratory Rate"
              placeholder="16"
              defaultValue={selectedPatient.vitals.respiratoryRate}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Any observations or notes..."
              />
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Save Vitals
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Vitals;