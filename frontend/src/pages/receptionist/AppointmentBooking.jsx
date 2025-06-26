import React, { useState } from 'react';
import { Calendar, Clock, User, Search, Plus } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Modal from '../../components/ui/Modal.jsx';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table.jsx';
import toast from 'react-hot-toast';

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: 'John Doe',
      doctor: 'Dr. Smith',
      time: '09:00',
      type: 'Consultation',
      status: 'confirmed',
      phone: '+1 (555) 123-4567'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      doctor: 'Dr. Johnson',
      time: '10:30',
      type: 'Follow-up',
      status: 'confirmed',
      phone: '+1 (555) 234-5678'
    },
    {
      id: 3,
      patient: 'Mike Wilson',
      doctor: 'Dr. Brown',
      time: '14:00',
      type: 'Check-up',
      status: 'pending',
      phone: '+1 (555) 345-6789'
    }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    patientPhone: '',
    doctor: '',
    date: selectedDate,
    time: '',
    type: 'consultation',
    notes: ''
  });

  const doctors = [
    { id: 1, name: 'Dr. Smith', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Johnson', specialty: 'General Practice' },
    { id: 3, name: 'Dr. Brown', specialty: 'Orthopedics' },
    { id: 4, name: 'Dr. Wilson', specialty: 'Pediatrics' }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const filteredAppointments = appointments.filter(apt =>
    apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookAppointment = () => {
    setIsModalOpen(true);
  };

  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    
    const appointment = {
      id: Date.now(),
      patient: newAppointment.patientName,
      doctor: newAppointment.doctor,
      time: newAppointment.time,
      type: newAppointment.type,
      status: 'confirmed',
      phone: newAppointment.patientPhone
    };

    setAppointments([...appointments, appointment]);
    setIsModalOpen(false);
    setNewAppointment({
      patientName: '',
      patientPhone: '',
      doctor: '',
      date: selectedDate,
      time: '',
      type: 'consultation',
      notes: ''
    });
    
    toast.success('Appointment booked successfully!');
  };

  const handleInputChange = (e) => {
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: e.target.value
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Appointment Booking</h1>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleBookAppointment} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Book Appointment</span>
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <div className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search appointments by patient or doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Appointments Table */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Appointments for {new Date(selectedDate).toLocaleDateString()}
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell header>Time</TableCell>
                <TableCell header>Patient</TableCell>
                <TableCell header>Doctor</TableCell>
                <TableCell header>Type</TableCell>
                <TableCell header>Contact</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{appointment.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{appointment.patient}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-900">{appointment.doctor}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600">{appointment.type}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{appointment.phone}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600">
                        Cancel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Book Appointment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Book New Appointment"
        size="lg"
      >
        <form onSubmit={handleSubmitAppointment} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Patient Name"
              name="patientName"
              value={newAppointment.patientName}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Patient Phone"
              name="patientPhone"
              type="tel"
              value={newAppointment.patientPhone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor
              </label>
              <select
                name="doctor"
                value={newAppointment.doctor}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.name}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Type
              </label>
              <select
                name="type"
                value={newAppointment.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="consultation">Consultation</option>
                <option value="follow-up">Follow-up</option>
                <option value="check-up">Check-up</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              name="date"
              type="date"
              value={newAppointment.date}
              onChange={handleInputChange}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <select
                name="time"
                value={newAppointment.time}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={newAppointment.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Any special notes or requirements..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Book Appointment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AppointmentBooking;