import React, { useState } from 'react';
import { Search, User, Heart, Thermometer, Activity, Plus, Clock } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Modal from '../../components/ui/Modal.jsx';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table.jsx';

const PatientCare = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [patients] = useState([
    {
      id: 1,
      name: 'John Doe',
      room: '101',
      age: 45,
      condition: 'Post-surgery recovery',
      status: 'stable',
      lastVitals: '2 hours ago',
      vitals: { bp: '120/80', temp: '98.6°F', pulse: '72', oxygen: '98%' },
      medications: ['Aspirin 100mg', 'Antibiotics'],
      notes: 'Patient recovering well from surgery'
    },
    {
      id: 2,
      name: 'Jane Smith',
      room: '102',
      age: 32,
      condition: 'Pneumonia',
      status: 'critical',
      lastVitals: '30 min ago',
      vitals: { bp: '140/90', temp: '101.2°F', pulse: '88', oxygen: '94%' },
      medications: ['Oxygen therapy', 'IV antibiotics'],
      notes: 'Requires close monitoring'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      room: '103',
      age: 28,
      condition: 'Broken leg',
      status: 'stable',
      lastVitals: '1 hour ago',
      vitals: { bp: '118/75', temp: '98.4°F', pulse: '68', oxygen: '99%' },
      medications: ['Pain medication', 'Anti-inflammatory'],
      notes: 'Cast applied, mobility restricted'
    }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.room.includes(searchTerm) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'recovering': return 'bg-blue-100 text-blue-800';
      case 'discharged': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Patient Care</h1>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Care Note</span>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <div className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search patients by name, room, or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
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
                <TableCell header>Room</TableCell>
                <TableCell header>Condition</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Last Vitals</TableCell>
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
                        <p className="text-sm text-gray-500">Age: {patient.age}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-900">{patient.room}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{patient.condition}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{patient.lastVitals}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewPatient(patient)}
                      >
                        View Details
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Heart className="h-4 w-4" />
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
        title="Patient Care Details"
        size="lg"
      >
        {selectedPatient && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Patient Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedPatient.name}</p>
                  <p><span className="font-medium">Room:</span> {selectedPatient.room}</p>
                  <p><span className="font-medium">Age:</span> {selectedPatient.age}</p>
                  <p><span className="font-medium">Condition:</span> {selectedPatient.condition}</p>
                  <p><span className="font-medium">Status:</span> {selectedPatient.status}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Current Vitals</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Blood Pressure:</span> {selectedPatient.vitals.bp}</p>
                  <p><span className="font-medium">Temperature:</span> {selectedPatient.vitals.temp}</p>
                  <p><span className="font-medium">Pulse:</span> {selectedPatient.vitals.pulse}</p>
                  <p><span className="font-medium">Oxygen:</span> {selectedPatient.vitals.oxygen}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Current Medications</h4>
              <ul className="list-disc list-inside space-y-1">
                {selectedPatient.medications.map((med, index) => (
                  <li key={index} className="text-gray-700">{med}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Care Notes</h4>
              <p className="text-gray-700">{selectedPatient.notes}</p>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button>
                Update Care Plan
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PatientCare;