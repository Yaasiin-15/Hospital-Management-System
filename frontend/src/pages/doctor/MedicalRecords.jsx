import React, { useState } from 'react';
import { Search, FileText, Calendar, User, Plus } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const MedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState([
    {
      id: 1,
      patient: 'John Doe',
      date: '2024-01-05',
      diagnosis: 'Hypertension',
      treatment: 'Prescribed Lisinopril 10mg daily',
      notes: 'Blood pressure 140/90. Follow up in 2 weeks.'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      date: '2024-01-08',
      diagnosis: 'Type 2 Diabetes',
      treatment: 'Prescribed Metformin 500mg twice daily',
      notes: 'HbA1c 7.2%. Referred to nutritionist.'
    },
    {
      id: 3,
      patient: 'Michael Johnson',
      date: '2024-01-12',
      diagnosis: 'Asthma',
      treatment: 'Prescribed Albuterol inhaler',
      notes: 'Patient experiences wheezing after exercise.'
    }
  ]);

  const filteredRecords = records.filter(
    record => 
      record.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
        <Button className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Record
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by patient name or diagnosis..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      <div className="grid gap-4">
        {filteredRecords.map(record => (
          <Card key={record.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-medium">{record.patient}</h3>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {record.date}
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-500">Diagnosis:</span>
                <p className="text-gray-900">{record.diagnosis}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Treatment:</span>
                <p className="text-gray-900">{record.treatment}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Notes:</span>
                <p className="text-gray-900">{record.notes}</p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button size="sm" variant="outline">View Details</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MedicalRecords;