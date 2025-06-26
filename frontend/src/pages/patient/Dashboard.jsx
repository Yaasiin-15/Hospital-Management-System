import React from 'react';
import Card from '../../components/ui/Card.jsx';
import { Calendar, FileText, DollarSign, Heart, Clock, CheckCircle } from 'lucide-react';

const PatientDashboard = () => {
  const stats = [
    { name: 'Upcoming Appointments', value: '2', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Medical Records', value: '8', icon: FileText, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Pending Bills', value: '$245', icon: DollarSign, color: 'text-red-600', bg: 'bg-red-100' },
    { name: 'Last Checkup', value: '2 weeks ago', icon: Heart, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  const upcomingAppointments = [
    { 
      id: 1, 
      doctor: 'Dr. Sarah Smith', 
      specialty: 'Cardiologist', 
      date: '2024-01-15', 
      time: '10:30 AM',
      type: 'Follow-up',
      status: 'confirmed'
    },
    { 
      id: 2, 
      doctor: 'Dr. Michael Johnson', 
      specialty: 'General Practitioner', 
      date: '2024-01-22', 
      time: '2:00 PM',
      type: 'Routine Checkup',
      status: 'confirmed'
    },
  ];

  const recentRecords = [
    { id: 1, date: '2024-01-01', doctor: 'Dr. Smith', diagnosis: 'Hypertension Follow-up', status: 'completed' },
    { id: 2, date: '2023-12-15', doctor: 'Dr. Johnson', diagnosis: 'Annual Physical', status: 'completed' },
    { id: 3, date: '2023-11-20', doctor: 'Dr. Brown', diagnosis: 'Blood Work Results', status: 'completed' },
  ];

  const medications = [
    { id: 1, name: 'Lisinopril 10mg', frequency: 'Once daily', prescribedBy: 'Dr. Smith' },
    { id: 2, name: 'Metformin 500mg', frequency: 'Twice daily', prescribedBy: 'Dr. Johnson' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600">Here's your health overview</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Book Appointment</span>
        </button>
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
        {/* Upcoming Appointments */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{appointment.doctor}</h4>
                    <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded-full">
                      {appointment.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{appointment.specialty}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{appointment.time}</span>
                    </span>
                  </div>
                  <p className="text-sm text-blue-600 mt-2">{appointment.type}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent Medical Records */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Medical Records</h3>
            <div className="space-y-4">
              {recentRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{record.diagnosis}</p>
                      <p className="text-sm text-gray-500">{record.doctor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{new Date(record.date).toLocaleDateString()}</p>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-full">
                      {record.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Current Medications */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Medications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medications.map((medication) => (
              <div key={medication.id} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900">{medication.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{medication.frequency}</p>
                <p className="text-sm text-gray-500 mt-2">Prescribed by {medication.prescribedBy}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PatientDashboard;