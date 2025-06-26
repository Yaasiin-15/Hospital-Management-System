import React, { useState } from 'react';
import { Search, User, FileText, Calendar, Filter } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const DoctorPatients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      age: 45, 
      gender: 'Male',
      condition: 'Hypertension',
      lastVisit: '2024-01-05',
      nextAppointment: '2024-01-20'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      age: 32, 
      gender: 'Female',
      condition: 'Diabetes Type 2',
      lastVisit: '2024-01-08',
      nextAppointment: '2024-02-10'
    },
    { 
      id: 3, 
      name: 'Michael Johnson', 
      age: 28, 
      gender: 'Male',
      condition: 'Asthma',
      lastVisit: '2024-01-12',
      nextAppointment: '2024-01-25'
    }
  ]);

  const filteredPatients = patients.filter(
    patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
        <Button className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      <div className="grid gap-4">
        {filteredPatients.map(patient => (
          <Card key={patient.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{patient.name}</h3>
                  <p className="text-sm text-gray-500">{patient.age} years • {patient.gender}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-blue-600">{patient.condition}</span>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  Last visit: {patient.lastVisit}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button size="sm" variant="outline">View Medical Records</Button>
              <Button size="sm">Schedule Appointment</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorPatients;