import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Calendar, Users, Phone, Clock, CheckCircle, UserPlus } from 'lucide-react';

const ReceptionistDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { name: 'Today\'s Appointments', value: '24', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Walk-ins', value: '7', icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Pending Check-ins', value: '5', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { name: 'Completed Today', value: '18', icon: CheckCircle, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  const upcomingAppointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', time: '2:30 PM', status: 'waiting' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Johnson', time: '3:00 PM', status: 'confirmed' },
    { id: 3, patient: 'Mike Wilson', doctor: 'Dr. Brown', time: '3:30 PM', status: 'confirmed' },
    { id: 4, patient: 'Sarah Davis', doctor: 'Dr. Smith', time: '4:00 PM', status: 'confirmed' },
  ];

  const waitingPatients = [
    { id: 1, name: 'Alice Johnson', appointmentTime: '2:00 PM', waitTime: '15 min', priority: 'normal' },
    { id: 2, name: 'Bob Brown', appointmentTime: '2:15 PM', waitTime: '30 min', priority: 'urgent' },
    { id: 3, name: 'Carol White', appointmentTime: '2:30 PM', waitTime: '5 min', priority: 'normal' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNewPatient = () => {
    navigate('/receptionist/register');
  };

  const handleBookAppointment = () => {
    navigate('/receptionist/appointments');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reception Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button onClick={handleNewPatient} className="flex items-center space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>New Patient</span>
          </Button>
          <Button onClick={handleBookAppointment} className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
            <Calendar className="h-4 w-4" />
            <span>Book Appointment</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patient}</p>
                      <p className="text-sm text-gray-500">{appointment.doctor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{appointment.time}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Waiting Patients */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Waiting Patients</h3>
            <div className="space-y-4">
              {waitingPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-500">Appt: {patient.appointmentTime}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{patient.waitTime}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(patient.priority)}`}>
                      {patient.priority}
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

export default ReceptionistDashboard;