import React, { useState } from 'react';
import { Search, Heart, Thermometer, Activity, Plus, TrendingUp, User, Clock } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

const Vitals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newVitals, setNewVitals] = useState({
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    temperature: '',
    pulse: '',
    oxygen: '',
    respiratoryRate: '',
    painLevel: '',
    weight: '',
    height: ''
  });

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Doe',
      patientId: 'P001',
      room: '101',
      lastCheck: '2 hours ago',
      vitals: {
        bloodPressure: '120/80',
        temperature: '98.6°F',
        pulse: '72',
        oxygen: '98%',
        respiratoryRate: '16',
        painLevel: '2/10',
        weight: '180 lbs'
      },
      status: 'normal',
      nextCheck: '6:00 PM',
      vitalsHistory: [
        { time: '06:00', bp: 118, temp: 98.4, pulse: 70, oxygen: 99 },
        { time: '10:00', bp: 120, temp: 98.6, pulse: 72, oxygen: 98 },
        { time: '14:00', bp: 122, temp: 98.8, pulse: 74, oxygen: 97 },
        { time: '18:00', bp: 120, temp: 98.6, pulse: 72, oxygen: 98 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      patientId: 'P002',
      room: '102',
      lastCheck: '30 min ago',
      vitals: {
        bloodPressure: '140/90',
        temperature: '101.2°F',
        pulse: '88',
        oxygen: '94%',
        respiratoryRate: '20',
        painLevel: '5/10',
        weight: '145 lbs'
      },
      status: 'abnormal',
      nextCheck: '4:00 PM',
      vitalsHistory: [
        { time: '06:00', bp: 145, temp: 100.8, pulse: 90, oxygen: 92 },
        { time: '10:00', bp: 142, temp: 101.0, pulse: 88, oxygen: 93 },
        { time: '14:00', bp: 140, temp: 101.2, pulse: 88, oxygen: 94 },
        { time: '18:00', bp: 138, temp: 100.9, pulse: 86, oxygen: 95 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      patientId: 'P003',
      room: '103',
      lastCheck: '1 hour ago',
      vitals: {
        bloodPressure: '118/75',
        temperature: '98.4°F',
        pulse: '68',
        oxygen: '99%',
        respiratoryRate: '14',
        painLevel: '3/10',
        weight: '195 lbs'
      },
      status: 'normal',
      nextCheck: '8:00 PM',
      vitalsHistory: [
        { time: '06:00', bp: 115, temp: 98.2, pulse: 66, oxygen: 99 },
        { time: '10:00', bp: 118, temp: 98.4, pulse: 68, oxygen: 99 },
        { time: '14:00', bp: 120, temp: 98.6, pulse: 70, oxygen: 98 },
        { time: '18:00', bp: 118, temp: 98.4, pulse: 68, oxygen: 99 }
      ]
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      patientId: 'P004',
      room: '104',
      lastCheck: '45 min ago',
      vitals: {
        bloodPressure: '150/95',
        temperature: '99.1°F',
        pulse: '95',
        oxygen: '96%',
        respiratoryRate: '18',
        painLevel: '4/10',
        weight: '160 lbs'
      },
      status: 'monitoring',
      nextCheck: '5:00 PM',
      vitalsHistory: [
        { time: '06:00', bp: 155, temp: 99.3, pulse: 98, oxygen: 95 },
        { time: '10:00', bp: 152, temp: 99.2, pulse: 96, oxygen: 96 },
        { time: '14:00', bp: 150, temp: 99.1, pulse: 95, oxygen: 96 },
        { time: '18:00', bp: 148, temp: 98.9, pulse: 93, oxygen: 97 }
      ]
    }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.room.includes(searchTerm) ||
    patient.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVitals = (patient) => {
    setSelectedPatient(patient);
    setNewVitals({
      bloodPressureSystolic: '',
      bloodPressureDiastolic: '',
      temperature: '',
      pulse: '',
      oxygen: '',
      respiratoryRate: '',
      painLevel: '',
      weight: '',
      height: ''
    });
    setIsVitalsModalOpen(true);
  };

  const handleViewHistory = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleSaveVitals = () => {
    const updatedVitals = {
      bloodPressure: `${newVitals.bloodPressureSystolic}/${newVitals.bloodPressureDiastolic}`,
      temperature: `${newVitals.temperature}°F`,
      pulse: newVitals.pulse,
      oxygen: `${newVitals.oxygen}%`,
      respiratoryRate: newVitals.respiratoryRate,
      painLevel: `${newVitals.painLevel}/10`,
      weight: `${newVitals.weight} lbs`
    };

    setPatients(patients.map(p => 
      p.id === selectedPatient.id 
        ? { 
            ...p, 
            vitals: updatedVitals,
            lastCheck: 'Just now',
            vitalsHistory: [
              ...p.vitalsHistory,
              {
                time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
                bp: parseInt(newVitals.bloodPressureSystolic),
                temp: parseFloat(newVitals.temperature),
                pulse: parseInt(newVitals.pulse),
                oxygen: parseInt(newVitals.oxygen)
              }
            ]
          }
        : p
    ));

    setIsVitalsModalOpen(false);
    toast.success(`Vitals recorded for ${selectedPatient.name}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'abnormal': return 'bg-red-100 text-red-800';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVitalStatus = (vital, type) => {
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
      case 'pulse':
        const pulse = parseInt(vital);
        if (pulse > 100) return 'high';
        if (pulse < 60) return 'low';
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

  const stats = [
    { name: 'Normal Vitals', value: patients.filter(p => p.status === 'normal').length, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Abnormal Vitals', value: patients.filter(p => p.status === 'abnormal').length, color: 'text-red-600', bg: 'bg-red-100' },
    { name: 'Monitoring', value: patients.filter(p => p.status === 'monitoring').length, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { name: 'Total Patients', value: patients.length, color: 'text-blue-600', bg: 'bg-blue-100' }
  ];

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
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <Heart className={`h-6 w-6 ${stat.color}`} />
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
              placeholder="Search patients by name, room, or patient ID..."
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
                <TableCell header>Pain Level</TableCell>
                <TableCell header>Status</TableCell>
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
                        <p className="text-sm text-gray-500">Room {patient.room} • {patient.patientId}</p>
                      </div>
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
                    <span className={`font-medium ${getVitalColor(getVitalStatus(patient.vitals.pulse, 'pulse'))}`}>
                      {patient.vitals.pulse} bpm
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getVitalColor(getVitalStatus(patient.vitals.oxygen, 'oxygen'))}`}>
                      {patient.vitals.oxygen}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{patient.vitals.painLevel}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{patient.lastCheck}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleAddVitals(patient)}
                      >
                        Record
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewHistory(patient)}
                      >
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
        isOpen={isVitalsModalOpen}
        onClose={() => setIsVitalsModalOpen(false)}
        title="Record Vital Signs"
        size="lg"
      >
        {selectedPatient && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="font-medium text-gray-900">{selectedPatient.name}</h4>
              <p className="text-sm text-gray-500">Room {selectedPatient.room} • {selectedPatient.patientId}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Systolic BP"
                placeholder="120"
                value={newVitals.bloodPressureSystolic}
                onChange={(e) => setNewVitals({...newVitals, bloodPressureSystolic: e.target.value})}
              />
              <Input
                label="Diastolic BP"
                placeholder="80"
                value={newVitals.bloodPressureDiastolic}
                onChange={(e) => setNewVitals({...newVitals, bloodPressureDiastolic: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Temperature (°F)"
                placeholder="98.6"
                value={newVitals.temperature}
                onChange={(e) => setNewVitals({...newVitals, temperature: e.target.value})}
              />
              <Input
                label="Pulse (bpm)"
                placeholder="72"
                value={newVitals.pulse}
                onChange={(e) => setNewVitals({...newVitals, pulse: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Oxygen Saturation (%)"
                placeholder="98"
                value={newVitals.oxygen}
                onChange={(e) => setNewVitals({...newVitals, oxygen: e.target.value})}
              />
              <Input
                label="Respiratory Rate"
                placeholder="16"
                value={newVitals.respiratoryRate}
                onChange={(e) => setNewVitals({...newVitals, respiratoryRate: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pain Level (0-10)
                </label>
                <select
                  value={newVitals.painLevel}
                  onChange={(e) => setNewVitals({...newVitals, painLevel: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select pain level</option>
                  {[...Array(11)].map((_, i) => (
                    <option key={i} value={i}>{i} - {i === 0 ? 'No pain' : i <= 3 ? 'Mild' : i <= 6 ? 'Moderate' : 'Severe'}</option>
                  ))}
                </select>
              </div>
              <Input
                label="Weight (lbs)"
                placeholder="180"
                value={newVitals.weight}
                onChange={(e) => setNewVitals({...newVitals, weight: e.target.value})}
              />
            </div>
            
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
              <Button type="button" variant="outline" onClick={() => setIsVitalsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveVitals}>
                Save Vitals
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Vitals History Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Vitals History"
        size="xl"
      >
        {selectedPatient && (
          <div className="space-y-6">
            <div className="text-center">
              <h4 className="font-medium text-gray-900">{selectedPatient.name}</h4>
              <p className="text-sm text-gray-500">Room {selectedPatient.room} • {selectedPatient.patientId}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 mb-3">Blood Pressure Trend</h5>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={selectedPatient.vitalsHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[100, 160]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="bp" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-900 mb-3">Temperature Trend</h5>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={selectedPatient.vitalsHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[97, 103]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="temp" stroke="#EF4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 mb-3">Pulse Trend</h5>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={selectedPatient.vitalsHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[60, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="pulse" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-900 mb-3">Oxygen Saturation Trend</h5>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={selectedPatient.vitalsHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[90, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="oxygen" stroke="#F59E0B" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Vitals;