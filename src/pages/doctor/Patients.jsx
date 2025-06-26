import React, { useState } from 'react';
import { Search, User, Phone, Mail, Calendar, FileText, Plus, Filter, MapPin } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table';

const DoctorPatients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [patients] = useState([
    {
      id: 1,
      name: 'John Doe',
      patientId: 'P001',
      age: 45,
      gender: 'Male',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@email.com',
      address: '123 Main St, City, State 12345',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-02-15',
      condition: 'Hypertension',
      status: 'Active',
      insuranceProvider: 'Blue Cross Blue Shield',
      emergencyContact: {
        name: 'Jane Doe',
        relation: 'Spouse',
        phone: '+1 (555) 123-4568'
      },
      medicalHistory: [
        'Hypertension (2020)',
        'High Cholesterol (2019)',
        'Appendectomy (2015)'
      ],
      currentMedications: [
        'Lisinopril 10mg daily',
        'Atorvastatin 20mg daily'
      ],
      allergies: ['Penicillin', 'Shellfish'],
      vitals: {
        bloodPressure: '140/90',
        weight: '180 lbs',
        height: '5\'10"',
        bmi: '25.8'
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      patientId: 'P002',
      age: 32,
      gender: 'Female',
      phone: '+1 (555) 234-5678',
      email: 'jane.smith@email.com',
      address: '456 Oak Ave, City, State 12345',
      lastVisit: '2024-01-10',
      nextAppointment: '2024-03-10',
      condition: 'Diabetes Type 2',
      status: 'Active',
      insuranceProvider: 'Aetna',
      emergencyContact: {
        name: 'Robert Smith',
        relation: 'Brother',
        phone: '+1 (555) 234-5679'
      },
      medicalHistory: [
        'Type 2 Diabetes (2022)',
        'Gestational Diabetes (2020)'
      ],
      currentMedications: [
        'Metformin 500mg twice daily',
        'Insulin as needed'
      ],
      allergies: ['Sulfa drugs'],
      vitals: {
        bloodPressure: '120/80',
        weight: '145 lbs',
        height: '5\'6"',
        bmi: '23.4'
      }
    },
    {
      id: 3,
      name: 'Mike Johnson',
      patientId: 'P003',
      age: 28,
      gender: 'Male',
      phone: '+1 (555) 345-6789',
      email: 'mike.johnson@email.com',
      address: '789 Pine St, City, State 12345',
      lastVisit: '2024-01-08',
      nextAppointment: '2024-01-22',
      condition: 'Post-surgery recovery',
      status: 'Recovering',
      insuranceProvider: 'Cigna',
      emergencyContact: {
        name: 'Sarah Johnson',
        relation: 'Mother',
        phone: '+1 (555) 345-6790'
      },
      medicalHistory: [
        'Appendectomy (2024)',
        'Broken arm (2018)'
      ],
      currentMedications: [
        'Pain medication as needed',
        'Antibiotics (7 days)'
      ],
      allergies: ['None known'],
      vitals: {
        bloodPressure: '118/75',
        weight: '175 lbs',
        height: '6\'0"',
        bmi: '23.7'
      }
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      patientId: 'P004',
      age: 55,
      gender: 'Female',
      phone: '+1 (555) 456-7890',
      email: 'sarah.wilson@email.com',
      address: '321 Elm Dr, City, State 12345',
      lastVisit: '2024-01-12',
      nextAppointment: '2024-04-12',
      condition: 'Arthritis',
      status: 'Active',
      insuranceProvider: 'UnitedHealth',
      emergencyContact: {
        name: 'Tom Wilson',
        relation: 'Husband',
        phone: '+1 (555) 456-7891'
      },
      medicalHistory: [
        'Rheumatoid Arthritis (2018)',
        'Osteoporosis (2020)',
        'Hysterectomy (2010)'
      ],
      currentMedications: [
        'Methotrexate 15mg weekly',
        'Calcium supplement daily'
      ],
      allergies: ['Aspirin'],
      vitals: {
        bloodPressure: '135/85',
        weight: '160 lbs',
        height: '5\'4"',
        bmi: '27.5'
      }
    }
  ]);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || patient.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'recovering': return 'bg-blue-100 text-blue-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'discharged': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { name: 'Total Patients', value: patients.length, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Active Patients', value: patients.filter(p => p.status === 'Active').length, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'This Month Visits', value: patients.filter(p => new Date(p.lastVisit).getMonth() === new Date().getMonth()).length, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Upcoming Appointments', value: patients.filter(p => new Date(p.nextAppointment) > new Date()).length, color: 'text-yellow-600', bg: 'bg-yellow-100' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Patient</span>
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

      {/* Search and Filters */}
      <Card>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search patients by name, ID, or condition..."
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
                        <p className="text-sm text-gray-500">{patient.patientId}</p>
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
        size="xl"
      >
        {selectedPatient && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {selectedPatient.name}</p>
                  <p><span className="font-medium">Patient ID:</span> {selectedPatient.patientId}</p>
                  <p><span className="font-medium">Age:</span> {selectedPatient.age}</p>
                  <p><span className="font-medium">Gender:</span> {selectedPatient.gender}</p>
                  <p><span className="font-medium">Phone:</span> {selectedPatient.phone}</p>
                  <p><span className="font-medium">Email:</span> {selectedPatient.email}</p>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <span className="text-sm">{selectedPatient.address}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Medical Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Condition:</span> {selectedPatient.condition}</p>
                  <p><span className="font-medium">Status:</span> {selectedPatient.status}</p>
                  <p><span className="font-medium">Last Visit:</span> {new Date(selectedPatient.lastVisit).toLocaleDateString()}</p>
                  <p><span className="font-medium">Next Appointment:</span> {new Date(selectedPatient.nextAppointment).toLocaleDateString()}</p>
                  <p><span className="font-medium">Insurance:</span> {selectedPatient.insuranceProvider}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Emergency Contact</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {selectedPatient.emergencyContact.name}</p>
                  <p><span className="font-medium">Relation:</span> {selectedPatient.emergencyContact.relation}</p>
                  <p><span className="font-medium">Phone:</span> {selectedPatient.emergencyContact.phone}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Current Vitals</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <p><span className="font-medium">Blood Pressure:</span> {selectedPatient.vitals.bloodPressure}</p>
                  <p><span className="font-medium">Weight:</span> {selectedPatient.vitals.weight}</p>
                  <p><span className="font-medium">Height:</span> {selectedPatient.vitals.height}</p>
                  <p><span className="font-medium">BMI:</span> {selectedPatient.vitals.bmi}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Allergies</h4>
                <div className="bg-red-50 p-4 rounded-lg">
                  {selectedPatient.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedPatient.allergies.map((allergy, index) => (
                        <span key={index} className="bg-red-100 text-red-800 px-2 py-1 text-xs rounded-full">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">No known allergies</p>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Current Medications</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                {selectedPatient.currentMedications.length > 0 ? (
                  <ul className="space-y-1">
                    {selectedPatient.currentMedications.map((medication, index) => (
                      <li key={index} className="text-sm text-blue-800">• {medication}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600">No current medications</p>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Medical History</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-1">
                  {selectedPatient.medicalHistory.map((history, index) => (
                    <li key={index} className="text-sm text-gray-700">• {history}</li>
                  ))}
                </ul>
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