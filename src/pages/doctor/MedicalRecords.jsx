import React, { useState } from 'react';
import { Search, FileText, Plus, Calendar, User, Download } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table';

const MedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [records] = useState([
    {
      id: 1,
      patient: 'John Doe',
      patientId: 'P001',
      date: '2024-01-15',
      diagnosis: 'Hypertension',
      treatment: 'Prescribed Lisinopril 10mg daily',
      notes: 'Blood pressure: 140/90. Patient advised on diet and exercise.',
      followUp: '2024-02-15'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      patientId: 'P002',
      date: '2024-01-10',
      diagnosis: 'Type 2 Diabetes',
      treatment: 'Metformin 500mg twice daily',
      notes: 'HbA1c: 7.2%. Discussed glucose monitoring and dietary changes.',
      followUp: '2024-04-10'
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      patientId: 'P003',
      date: '2024-01-08',
      diagnosis: 'Post-operative care',
      treatment: 'Wound care and antibiotics',
      notes: 'Appendectomy recovery progressing well. No signs of infection.',
      followUp: '2024-01-22'
    },
    {
      id: 4,
      patient: 'Sarah Wilson',
      patientId: 'P004',
      date: '2024-01-12',
      diagnosis: 'Rheumatoid Arthritis',
      treatment: 'Methotrexate 15mg weekly',
      notes: 'Joint pain improved. Continue current medication regimen.',
      followUp: '2024-04-12'
    }
  ]);

  const filteredRecords = records.filter(record =>
    record.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleAddRecord = () => {
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
        <Button onClick={handleAddRecord} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Record</span>
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
                  placeholder="Search by patient name, ID, or diagnosis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Records</option>
                <option value="recent">Recent (30 days)</option>
                <option value="followup">Follow-up Due</option>
                <option value="chronic">Chronic Conditions</option>
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
                <TableCell header>Treatment</TableCell>
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
                    <span className="text-sm text-gray-600">{record.treatment}</span>
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
              <p className="text-gray-700">{selectedRecord.treatment}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
              <p className="text-gray-700">{selectedRecord.notes}</p>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button>
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
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Patient ID" placeholder="Enter patient ID" />
            <Input label="Date" type="date" />
          </div>
          
          <Input label="Diagnosis" placeholder="Enter diagnosis" />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Treatment
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Enter treatment details"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter additional notes"
            />
          </div>
          
          <Input label="Follow-up Date" type="date" />
          
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