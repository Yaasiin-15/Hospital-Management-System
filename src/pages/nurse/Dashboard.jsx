import React from 'react';
import Card from '../../components/ui/Card';
import { Users, Activity, Pill, Heart, Thermometer, AlertTriangle } from 'lucide-react';

const NurseDashboard = () => {
  const stats = [
    { name: 'Patients Assigned', value: '12', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Medications Due', value: '8', icon: Pill, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Vitals Pending', value: '5', icon: Heart, color: 'text-red-600', bg: 'bg-red-100' },
    { name: 'Critical Alerts', value: '2', icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  ];

  const patientList = [
    { id: 1, name: 'John Doe', room: '101', status: 'stable', lastVitals: '2 hours ago' },
    { id: 2, name: 'Jane Smith', room: '102', status: 'critical', lastVitals: '30 min ago' },
    { id: 3, name: 'Mike Johnson', room: '103', status: 'stable', lastVitals: '1 hour ago' },
    { id: 4, name: 'Sarah Wilson', room: '104', status: 'recovering', lastVitals: '45 min ago' },
  ];

  const medicationSchedule = [
    { id: 1, patient: 'John Doe', medication: 'Aspirin 100mg', time: '2:00 PM', status: 'pending' },
    { id: 2, patient: 'Jane Smith', medication: 'Insulin 10 units', time: '2:30 PM', status: 'overdue' },
    { id: 3, patient: 'Mike Johnson', medication: 'Antibiotics', time: '3:00 PM', status: 'pending' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'recovering': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMedicationStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Nurse Dashboard</h1>
        <div className="text-sm text-gray-500">
          Shift: Day Shift • {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient List */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Patients</h3>
            <div className="space-y-4">
              {patientList.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-500">Room {patient.room}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{patient.lastVitals}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Medication Schedule */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Medication Schedule</h3>
            <div className="space-y-4">
              {medicationSchedule.map((med) => (
                <div key={med.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Pill className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{med.patient}</p>
                      <p className="text-sm text-gray-500">{med.medication}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{med.time}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getMedicationStatusColor(med.status)}`}>
                      {med.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NurseDashboard;