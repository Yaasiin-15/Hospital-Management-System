import React, { useState } from 'react';
import { Search, FileText, Plus, Calendar, User, Download, Edit, Eye } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import toast from 'react-hot-toast';

const MedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('');

  const [records, setRecords] = useState([
    {
      id: 1,
      patient: 'John Doe',
      patientId: 'P001',
      date: '2024-01-15',
      diagnosis: 'Hypertension',
      treatment: 'Prescribed Lisinopril 10mg daily',
      notes: 'Blood pressure: 140/90. Patient advised on diet and exercise.',
      followUp: '2024-02-15',
      type: 'Follow-up',
      urgency: 'normal',
      attachments: ['blood_test_results.pdf', 'xray_chest.jpg']
    },
    {
      id: 2,
      patient: 'Jane Smith',
      patientId: 'P002',
      date: '2024-01-10',
      diagnosis: 'Type 2 Diabetes',
      treatment: 'Metformin 500mg twice daily',
      notes: 'HbA1c: 7.2%. Discussed glucose monitoring and dietary changes.',
      followUp: '2024-04-10',
      type: 'Initial Consultation',
      urgency: 'normal',
      attachments: ['lab_results.pdf']
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      patientId: 'P003',
      date: '2024-01-08',
      diagnosis: 'Post-operative care',
      treatment: 'Wound care and antibiotics',
      notes: 'Appendectomy recovery progressing well. No signs of infection.',
      followUp: '2024-01-22',
      type: 'Post-operative',
      urgency: 'high',
      attachments: []
    },
    {
      id: 4,
      patient: 'Sarah Wilson',
      patientId: 'P004',
      date: '2024-01-12',
      diagnosis: 'Rheumatoid Arthritis',
      treatment: 'Methotrexate 15mg weekly',
      notes: 'Joint pain improved. Continue current medication regimen.',
      followUp: '2024-04-12',
      type: 'Follow-up',
      urgency: 'normal',
      attachments: ['rheumatology_report.pdf']
    },
    {
      id: 5,
      patient: 'Robert Brown',
      patientId: 'P005',
      date: '2024-01-14',
      diagnosis: 'Acute Bronchitis',
      treatment: 'Antibiotics and rest',
      notes: 'Symptoms improved significantly. No fever for 48 hours.',
      followUp: '2024-01-28',
      type: 'Emergency',
      urgency: 'normal',
      attachments: ['chest_xray.jpg']
    }
  ]);

  const [newRecord, setNewRecord] = useState({
    patientId: '',
    diagnosis: '',
    treatment: '',
    notes: '',
    type: 'consultation',
    urgency: 'normal',
    followUpDate: ''
  });

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || record.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleAddRecord = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveRecord = (e) => {
    e.preventDefault();
    
    const record = {
      id: Date.now(),
      patient: `Patient ${newRecord.patientId}`, // In real app, get from patient lookup
      patientId: newRecord.patientId,
      date: new Date().toISOString().split('T')[0],
      diagnosis: newRecord.diagnosis,
      treatment: newRecord.treatment,
      notes: newRecord.notes,
      followUp: newRecord.followUpDate,
      type: newRecord.type,
      urgency: newRecord.urgency,
      attachments: []
    };

    setRecords([record, ...records]);
    setIsAddModalOpen(false);
    setNewRecord({
      patientId: '',
      diagnosis: '',
      treatment: '',
      notes: '',
      type: 'consultation',
      urgency: 'normal',
      followUpDate: ''
    });
    
    toast.success('Medical record created successfully');
  };

  const handleInputChange = (e) => {
    setNewRecord({
      ...newRecord,
      [e.target.name]: e.target.value
    });
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'emergency': return 'bg-red-100 text-red-800';
      case 'follow-up': return 'bg-blue-100 text-blue-800';
      case 'initial consultation': return 'bg-green-100 text-green-800';
      case 'post-operative': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { name: 'Total Records', value: records.length, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'This Month', value: records.filter(r => new Date(r.date).getMonth() === new Date().getMonth()).length, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Follow-ups Due', value: records.filter(r => new Date(r.followUp) <= new Date(Date.now() + 7*24*60*60*1000)).length, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { name: 'High Priority', value: records.filter(r => r.urgency === 'high').length, color: 'text-red-600', bg: 'bg-red-100' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
        <Button onClick={handleAddRecord} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Record</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <FileText className={`h-6 w-6 ${stat.color}`} />
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
                  placeholder="Search by patient name, ID, or diagnosis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="initial consultation">Initial Consultation</option>
                <option value="follow-up">Follow-up</option>
                <option value="emergency">Emergency</option>
                <option value="post-operative">Post-operative</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Records Table */}
      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell header>Patient</TableCell>
                <TableCell header>Date</TableCell>
                <TableCell header>Diagnosis</TableCell>
                <TableCell header>Type</TableCell>
                <TableCell header>Urgency</TableCell>
                <TableCell header>Follow-up</TableCell>
                <TableCell header>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{record.patient}</p>
                        <p className="text-sm text-gray-500">{record.patientId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{new Date(record.date).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-900">{record.diagnosis}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(record.type)}`}>
                      {record.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(record.urgency)}`}>
                      {record.urgency}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {new Date(record.followUp).toLocaleDateString()}
                    </span>
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
        </div>
      </Card>

      {/* View Record Modal */}
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
                <h4 className="font-medium text-gray-900 mb-2">Patient Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedRecord.patient}</p>
                  <p><span className="font-medium">Patient ID:</span> {selectedRecord.patientId}</p>
                  <p><span className="font-medium">Date:</span> {new Date(selectedRecord.date).toLocaleDateString()}</p>
                  <p><span className="font-medium">Type:</span> {selectedRecord.type}</p>
                  <p><span className="font-medium">Urgency:</span> {selectedRecord.urgency}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Medical Details</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Diagnosis:</span> {selectedRecord.diagnosis}</p>
                  <p><span className="font-medium">Follow-up:</span> {new Date(selectedRecord.followUp).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Treatment</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedRecord.treatment}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedRecord.notes}</p>
            </div>

            {selectedRecord.attachments.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Attachments</h4>
                <div className="space-y-2">
                  {selectedRecord.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800">
                      <FileText className="h-4 w-4" />
                      <span className="cursor-pointer">{attachment}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Record
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Record Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Medical Record"
        size="lg"
      >
        <form onSubmit={handleSaveRecord} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Patient ID"
              name="patientId"
              value={newRecord.patientId}
              onChange={handleInputChange}
              placeholder="Enter patient ID"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                name="type"
                value={newRecord.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="consultation">Consultation</option>
                <option value="follow-up">Follow-up</option>
                <option value="emergency">Emergency</option>
                <option value="post-operative">Post-operative</option>
              </select>
            </div>
          </div>
          
          <Input
            label="Diagnosis"
            name="diagnosis"
            value={newRecord.diagnosis}
            onChange={handleInputChange}
            placeholder="Enter diagnosis"
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Treatment
            </label>
            <textarea
              name="treatment"
              value={newRecord.treatment}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Enter treatment details"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={newRecord.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter additional notes"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Urgency
              </label>
              <select
                name="urgency"
                value={newRecord.urgency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>
            <Input
              label="Follow-up Date"
              name="followUpDate"
              type="date"
              value={newRecord.followUpDate}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Record
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MedicalRecords;