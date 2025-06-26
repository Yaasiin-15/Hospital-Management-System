import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

const DoctorSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);

  const [schedule] = useState([
    { id: 1, day: 'Monday', startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { id: 2, day: 'Tuesday', startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { id: 3, day: 'Wednesday', startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { id: 4, day: 'Thursday', startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { id: 5, day: 'Friday', startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { id: 6, day: 'Saturday', startTime: '09:00', endTime: '13:00', breakStart: null, breakEnd: null },
  ]);

  const [timeSlots] = useState([
    { id: 1, date: '2024-01-15', time: '09:00', duration: 30, patient: 'John Doe', type: 'Consultation' },
    { id: 2, date: '2024-01-15', time: '09:30', duration: 30, patient: 'Jane Smith', type: 'Follow-up' },
    { id: 3, date: '2024-01-15', time: '10:00', duration: 30, patient: null, type: 'Available' },
    { id: 4, date: '2024-01-15', time: '10:30', duration: 30, patient: 'Mike Johnson', type: 'Check-up' },
    { id: 5, date: '2024-01-15', time: '11:00', duration: 30, patient: null, type: 'Available' },
    { id: 6, date: '2024-01-15', time: '11:30', duration: 30, patient: null, type: 'Available' },
    { id: 7, date: '2024-01-15', time: '14:00', duration: 30, patient: 'Sarah Wilson', type: 'Consultation' },
    { id: 8, date: '2024-01-15', time: '14:30', duration: 30, patient: null, type: 'Available' },
    { id: 9, date: '2024-01-15', time: '15:00', duration: 30, patient: null, type: 'Available' },
    { id: 10, date: '2024-01-15', time: '15:30', duration: 30, patient: 'Robert Brown', type: 'Emergency' },
  ]);

  const selectedDateSlots = timeSlots.filter(slot => slot.date === selectedDate);

  const handleAddTimeSlot = () => {
    setEditingSlot(null);
    setIsModalOpen(true);
  };

  const handleEditSlot = (slot) => {
    setEditingSlot(slot);
    setIsModalOpen(true);
  };

  const getSlotColor = (slot) => {
    if (!slot.patient) return 'bg-green-100 text-green-800 border-green-200';
    if (slot.type === 'Emergency') return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const getSlotIcon = (slot) => {
    if (!slot.patient) return '🟢';
    if (slot.type === 'Emergency') return '🚨';
    return '👤';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleAddTimeSlot} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Block Time</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Schedule */}
        <Card className="lg:col-span-1">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule</h3>
            <div className="space-y-4">
              {schedule.map((day) => (
                <div key={day.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{day.day}</h4>
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{day.startTime} - {day.endTime}</span>
                    </p>
                    {day.breakStart && (
                      <p className="flex items-center space-x-2 mt-1">
                        <span className="w-4 h-4 flex items-center justify-center">☕</span>
                        <span>Break: {day.breakStart} - {day.breakEnd}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Daily Time Slots */}
        <Card className="lg:col-span-2">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Schedule for {new Date(selectedDate).toLocaleDateString()}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDateSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${getSlotColor(slot)}`}
                  onClick={() => handleEditSlot(slot)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getSlotIcon(slot)}</span>
                      <span className="font-medium">{slot.time}</span>
                    </div>
                    <span className="text-xs font-medium">
                      {slot.duration} min
                    </span>
                  </div>
                  <div>
                    {slot.patient ? (
                      <div>
                        <p className="font-medium">{slot.patient}</p>
                        <p className="text-sm opacity-75">{slot.type}</p>
                      </div>
                    ) : (
                      <p className="font-medium">Available</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Time Slot Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSlot ? 'Edit Time Slot' : 'Block Time Slot'}
        size="md"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              defaultValue={editingSlot?.date || selectedDate}
            />
            <Input
              label="Time"
              type="time"
              defaultValue={editingSlot?.time || ''}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes)
              </label>
              <select
                defaultValue={editingSlot?.duration || 30}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                defaultValue={editingSlot?.type || 'Available'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Available">Available</option>
                <option value="Blocked">Blocked</option>
                <option value="Break">Break</option>
                <option value="Meeting">Meeting</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Add any notes..."
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            {editingSlot && (
              <Button type="button" variant="danger">
                Delete
              </Button>
            )}
            <Button type="submit">
              {editingSlot ? 'Update' : 'Save'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DoctorSchedule;