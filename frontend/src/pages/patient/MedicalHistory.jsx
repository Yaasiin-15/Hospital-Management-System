import React, { useState } from 'react';
import { FileText, Calendar, User, Download, Eye } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Modal from '../../components/ui/Modal.jsx';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table.jsx';

const MedicalHistory = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('records');

  const [medicalRecords] = useState([
    {
      id: 1,
      date: '2024-01-01',
      doctor: 'Dr. Sarah Smith',
      specialty: 'Cardiologist',
      diagnosis: 'Hypertension Follow-up',
      treatment: 'Prescribed Lisinopril 10mg daily',
      notes: 'Blood pressure: 140/90. Patient advised on diet and exercise. Follow-up in 3 months.',
      type: 'Follow-up Visit'
    },
    {
      id: 2,
      date: '2023-12-15',
      doctor: 'Dr. Michael Johnson',
      specialty: 'General Practitioner',
      diagnosis: 'Annual Physical Examination',
      treatment: 'Routine blood work ordered',
      notes: 'Overall health good. Recommended annual mammogram and colonoscopy.',
      type: 'Routine Checkup'
    },
    {
      id: 3,
      date: '2023-11-20',
      doctor: 'Dr. Emily Brown',
      specialty: 'Dermatologist',
      diagnosis: 'Skin Examination',
      treatment: 'Removed suspicious mole for biopsy',
      notes: 'Biopsy results: Benign. Continue regular skin checks.',
      type: 'Consultation'
    }
  ]);

  const [testResults] = useState([
    {
      id: 1,
      date: '2024-01-05',
      test: 'Complete Blood Count',
      doctor: 'Dr. Michael Johnson',
      status: 'Normal',
      results: 'All values within normal range'
    },
    {
      id: 2,
      date: '2023-12-20',
      test: 'Lipid Panel',
      doctor: 'Dr. Sarah Smith',
      status: 'Abnormal',
      results: 'Elevated cholesterol - 240 mg/dL'
    },
    {
      id: 3,
      date: '2023-11-25',
      test: 'Skin Biopsy',
      doctor: 'Dr. Emily Brown',
      status: 'Normal',
      results: 'Benign nevus, no malignancy detected'
    }
  ]);

  const [medications] = useState([
    {
      id: 1,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Sarah Smith',
      startDate: '2024-01-01',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily at bedtime',
      prescribedBy: 'Dr. Sarah Smith',
      startDate: '2023-12-20',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Ibuprofen',
      dosage: '400mg',
      frequency: 'As needed',
      prescribedBy: 'Dr. Michael Johnson',
      startDate: '2023-12-15',
      status: 'As Needed'
    }
  ]);

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Normal': return 'bg-green-100 text-green-800';
      case 'Abnormal': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'As Needed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Medical History</h1>
        <Button className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Download Records</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Medical Records</p>
              <p className="text-2xl font-bold text-gray-900">{medicalRecords.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Test Results</p>
              <p className="text-2xl font-bold text-gray-900">{testResults.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Medications</p>
              <p className="text-2xl font-bold text-gray-900">
                {medications.filter(m => m.status === 'Active').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Last Visit</p>
              <p className="text-lg font-bold text-gray-900">Jan 1, 2024</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setSelectedTab('records')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'records'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Medical Records
            </button>
            <button
              onClick={() => setSelectedTab('tests')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'tests'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Test Results
            </button>
            <button
              onClick={() => setSelectedTab('medications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'medications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Medications
            </button>
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'records' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell header>Date</TableCell>
                  <TableCell header>Doctor</TableCell>
                  <TableCell header>Type</TableCell>
                  <TableCell header>Diagnosis</TableCell>
                  <TableCell header>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicalRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{new Date(record.date).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{record.doctor}</p>
                        <p className="text-sm text-gray-500">{record.specialty}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-900">{record.type}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-900">{record.diagnosis}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewRecord(record)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {selectedTab === 'tests' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell header>Date</TableCell>
                  <TableCell header>Test</TableCell>
                  <TableCell header>Doctor</TableCell>
                  <TableCell header>Status</TableCell>
                  <TableCell header>Results</TableCell>
                  <TableCell header>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testResults.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell>
                      <span>{new Date(test.date).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{test.test}</span>
                    </TableCell>
                    <TableCell>
                      <span>{test.doctor}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(test.status)}`}>
                        {test.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{test.results}</span>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {selectedTab === 'medications' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell header>Medication</TableCell>
                  <TableCell header>Dosage</TableCell>
                  <TableCell header>Frequency</TableCell>
                  <TableCell header>Prescribed By</TableCell>
                  <TableCell header>Start Date</TableCell>
                  <TableCell header>Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medications.map((medication) => (
                  <TableRow key={medication.id}>
                    <TableCell>
                      <span className="font-medium">{medication.name}</span>
                    </TableCell>
                    <TableCell>
                      <span>{medication.dosage}</span>
                    </TableCell>
                    <TableCell>
                      <span>{medication.frequency}</span>
                    </TableCell>
                    <TableCell>
                      <span>{medication.prescribedBy}</span>
                    </TableCell>
                    <TableCell>
                      <span>{new Date(medication.startDate).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(medication.status)}`}>
                        {medication.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>

      {/* Medical Record Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Medical Record Details"
        size="lg"
      >
        {selectedRecord && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Visit Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Date:</span> {new Date(selectedRecord.date).toLocaleDateString()}</p>
                  <p><span className="font-medium">Doctor:</span> {selectedRecord.doctor}</p>
                  <p><span className="font-medium">Specialty:</span> {selectedRecord.specialty}</p>
                  <p><span className="font-medium">Type:</span> {selectedRecord.type}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Medical Details</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Diagnosis:</span> {selectedRecord.diagnosis}</p>
                  <p><span className="font-medium">Treatment:</span> {selectedRecord.treatment}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Notes</h4>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedRecord.notes}</p>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MedicalHistory;