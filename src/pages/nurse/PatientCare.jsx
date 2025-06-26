import React, { useState } from 'react';
import { Search, User, Heart, Thermometer, Activity, Plus, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import toast from 'react-hot-toast';

const PatientCare = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddCareNoteOpen, setIsAddCareNoteOpen] = useState(false);
  const [careNote, setCareNote] = useState('');

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Doe',
      patientId: 'P001',
      room: '101',
      age: 45,
      condition: 'Post-surgery recovery',
      status: 'stable',
      lastVitals: '2 hours ago',
      vitals: { 
        bp: '120/80', 
        temp: '98.6°F', 
        pulse: '72', 
        oxygen: '98%',
        respiratoryRate: '16',
        painLevel: '3/10'
      },
      medications: ['Aspirin 100mg', 'Antibiotics'],
      notes: 'Patient recovering well from surgery. Ambulating with assistance.',
      careNotes: [
        { time: '08:00', note: 'Vital signs stable, patient comfortable' },
        { time: '12:00', note: 'Assisted with ambulation, tolerated well' },
        { time: '16:00', note: 'Pain level decreased, appetite improving' }
      ],
      allergies: ['Penicillin'],
      diet: 'Regular',
      mobility: 'Assisted ambulation'
    },
    {
      id: 2,
      name: 'Jane Smith',
      patientId: 'P002',
      room: '102',
      age: 32,
      condition: 'Pneumonia',
      status: 'critical',
      lastVitals: '30 min ago',
      vitals: { 
        bp: '140/90', 
        temp: '101.2°F', 
        pulse: '88', 
        oxygen: '94%',
        respiratoryRate: '22',
        painLevel: '5/10'
      },
      medications: ['Oxygen therapy', 'IV antibiotics', 'Bronchodilators'],
      notes: 'Requires close monitoring. Oxygen saturation improving.',
      careNotes: [
        { time: '06:00', note: 'Oxygen saturation 92%, increased O2 flow' },
        { time: '10:00', note: 'Breathing treatments administered' },
        { time: '14:00', note: 'Patient more comfortable, O2 sat improving' }
      ],
      allergies: ['Sulfa drugs'],
      diet: 'Clear liquids',
      mobility: 'Bed rest'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      patientId: 'P003',
      room: '103',
      age: 28,
      condition: 'Broken leg',
      status: 'stable',
      lastVitals: '1 hour ago',
      vitals: { 
        bp: '118/75', 
        temp: '98.4°F', 
        pulse: '68', 
        oxygen: '99%',
        respiratoryRate: '14',
        painLevel: '4/10'
      },
      medications: ['Pain medication', 'Anti-inflammatory'],
      notes: 'Cast applied, mobility restricted. Pain well controlled.',
      careNotes: [
        { time: '09:00', note: 'Cast check - no swelling or discoloration' },
        { time: '13:00', note: 'Pain medication effective' },
        { time: '17:00', note: 'Patient using crutches appropriately' }
      ],
      allergies: ['None known'],
      diet: 'Regular',
      mobility: 'Crutches'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      patientId: 'P004',
      room: '104',
      age: 67,
      condition: 'Heart failure',
      status: 'monitoring',
      lastVitals: '45 min ago',
      vitals: { 
        bp: '150/95', 
        temp: '98.8°F', 
        pulse: '95', 
        oxygen: '96%',
        respiratoryRate: '18',
        painLevel: '2/10'
      },
      medications: ['Diuretics', 'ACE inhibitors', 'Beta blockers'],
      notes: 'Fluid balance monitoring. Weight stable.',
      careNotes: [
        { time: '07:00', note: 'Daily weight 145 lbs, no change' },
        { time: '11:00', note: 'No signs of fluid retention' },
        { time: '15:00', note: 'Tolerating medications well' }
      ],
      allergies: ['Aspirin'],
      diet: 'Low sodium',
      mobility: 'Independent'
    }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.room.includes(searchTerm) ||
    patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleAddCareNote = () => {
    if (!careNote.trim()) return;
    
    const newNote = {
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      note: careNote
    };
    
    setPatients(patients.map(p => 
      p.id === selectedPatient.id 
        ? { ...p, careNotes: [...p.careNotes, newNote] }
        : p
    ));
    
    setSelectedPatient({
      ...selectedPatient,
      careNotes: [...selectedPatient.careNotes, newNote]
    });
    
    setCareNote('');
    setIsAddCareNoteOpen(false);
    toast.success('Care note added successfully');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'recovering': return 'bg-blue-100 text-blue-800';
      case 'discharged': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'stable': return <CheckCircle className="h-4 w-4" />;
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'monitoring': return <Activity className="h-4 w-4" />;
      case 'recovering': return <Heart className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const stats = [
    { name: 'Total Patients', value: patients.length, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Stable', value: patients.filter(p => p.status === 'stable').length, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Critical', value: patients.filter(p => p.status === 'critical').length, color: 'text-red-600', bg: 'bg-red-100' },
    { name: 'Monitoring', value: patients.filter(p => p.status === 'monitoring').length, color: 'text-yellow-600', bg: 'bg-yellow-100' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Patient Care</h1>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Care Note</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <User className={`h-6 w-6 ${stat.color}`} />
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
              placeholder="Search patients by name, room, ID, or condition..."
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
                <TableCell header>Vitals</TableCell>
                <TableCell header>Last Check</TableCell>
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
                        <p className="text-sm text-gray-500">{patient.patientId} • Age: {patient.age}</p>
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
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                        {getStatusIcon(patient.status)}
                        <span className="ml-1">{patient.status}</span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>BP: {patient.vitals.bp}</p>
                      <p>Temp: {patient.vitals.temp}</p>
                      <p>O2: {patient.vitals.oxygen}</p>
                    </div>
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
        size="xl"
      >
        {selectedPatient && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Patient Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedPatient.name}</p>
                  <p><span className="font-medium">ID:</span> {selectedPatient.patientId}</p>
                  <p><span className="font-medium">Room:</span> {selectedPatient.room}</p>
                  <p><span className="font-medium">Age:</span> {selectedPatient.age}</p>
                  <p><span className="font-medium">Condition:</span> {selectedPatient.condition}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedPatient.status)}`}>
                      {selectedPatient.status}
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Current Vitals</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Blood Pressure:</span> {selectedPatient.vitals.bp}</p>
                  <p><span className="font-medium">Temperature:</span> {selectedPatient.vitals.temp}</p>
                  <p><span className="font-medium">Pulse:</span> {selectedPatient.vitals.pulse}</p>
                  <p><span className="font-medium">Oxygen:</span> {selectedPatient.vitals.oxygen}</p>
                  <p><span className="font-medium">Respiratory Rate:</span> {selectedPatient.vitals.respiratoryRate}</p>
                  <p><span className="font-medium">Pain Level:</span> {selectedPatient.vitals.painLevel}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Care Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Diet:</span> {selectedPatient.diet}</p>
                  <p><span className="font-medium">Mobility:</span> {selectedPatient.mobility}</p>
                  <p><span className="font-medium">Allergies:</span> {selectedPatient.allergies.join(', ')}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Current Medications</h4>
              <div className="flex flex-wrap gap-2">
                {selectedPatient.medications.map((med, index) => (
                  <span key={index} className="inline-flex px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                    {med}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">Care Notes</h4>
                <Button size="sm" onClick={() => setIsAddCareNoteOpen(true)}>
                  Add Note
                </Button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                {selectedPatient.careNotes.map((note, index) => (
                  <div key={index} className="mb-2 last:mb-0">
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="font-medium text-gray-600">{note.time}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-700">{note.note}</span>
                    </div>
                  </div>
                ))}
              </div>
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

      {/* Add Care Note Modal */}
      <Modal
        isOpen={isAddCareNoteOpen}
        onClose={() => setIsAddCareNoteOpen(false)}
        title="Add Care Note"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Care Note
            </label>
            <textarea
              value={careNote}
              onChange={(e) => setCareNote(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter care note details..."
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setIsAddCareNoteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCareNote}>
              Add Note
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PatientCare;