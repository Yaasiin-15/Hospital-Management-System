import React from 'react';
import Card from '../../components/ui/Card';
import { Calendar, Users, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const DoctorDashboard = () => {
  const todayStats = [
    { name: 'Today\'s Appointments', value: '8', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Patients Seen', value: '5', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Pending Records', value: '3', icon: FileText, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { name: 'Next Appointment', value: '2:30 PM', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  const upcomingAppointments = [
    { id: 1, patient: 'John Doe', time: '2:30 PM', type: 'Consultation', status: 'confirmed' },
    { id: 2, patient: 'Jane Smith', time: '3:00 PM', type: 'Follow-up', status: 'confirmed' },
    { id: 3, patient: 'Mike Johnson', time: '3:30 PM', type: 'Check-up', status: 'pending' },
    { id: 4, patient: 'Sarah Wilson', time: '4:00 PM', type: 'Consultation', status: 'confirmed' },
  ];

  const recentPatients = [
    { id: 1, name: 'Alice Brown', lastVisit: '2 days ago', condition: 'Hypertension' },
    { id: 2, name: 'Bob Davis', lastVisit: '1 week ago', condition: 'Diabetes' },
    { id: 3, name: 'Carol White', lastVisit: '3 days ago', condition: 'Asthma' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {todayStats.map((stat) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Appointments</h3>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patient}</p>
                      <p className="text-sm text-gray-500">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{appointment.time}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent Patients */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Patients</h3>
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-500">{patient.condition}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{patient.lastVisit}</p>
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

export default DoctorDashboard;