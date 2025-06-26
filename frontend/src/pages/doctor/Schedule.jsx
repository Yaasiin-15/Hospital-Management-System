import React, { useState } from 'react';
import { Calendar, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Generate time slots from 8 AM to 5 PM
  const timeSlots = Array.from({ length: 10 }, (_, i) => ({
    time: `${i + 8}:00`,
    appointments: []
  }));

  // Sample appointments data
  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      patient: 'John Doe', 
      time: '9:00', 
      duration: 30, 
      type: 'Follow-up'
    },
    { 
      id: 2, 
      patient: 'Jane Smith', 
      time: '10:00', 
      duration: 45, 
      type: 'Consultation'
    },
    { 
      id: 3, 
      patient: 'Michael Johnson', 
      time: '13:00', 
      duration: 30, 
      type: 'Check-up'
    }
  ]);

  // Add appointments to time slots
  const schedule = timeSlots.map(slot => {
    const appt = appointments.find(a => a.time === slot.time);
    return {
      ...slot,
      appointment: appt || null
    };
  });

  // Function to navigate between days
  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + days);
    setCurrentDate(newDate);
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => changeDate(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{formatDate(currentDate)}</span>
          <Button variant="outline" size="sm" onClick={() => changeDate(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {schedule.map((slot, index) => (
            <div 
              key={index}
              className={`flex py-2 ${index !== schedule.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <div className="w-20 flex-shrink-0 flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm font-medium">{slot.time}</span>
              </div>
              
              <div className="flex-1 ml-4">
                {slot.appointment ? (
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{slot.appointment.patient}</h3>
                          <div className="flex items-center text-xs text-gray-500 mt-0.5">
                            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                              {slot.appointment.type}
                            </span>
                            <span className="mx-1">•</span>
                            <span>{slot.appointment.duration} min</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                ) : (
                  <div className="border border-dashed border-gray-300 rounded-lg p-3 flex items-center justify-center h-[68px]">
                    <span className="text-sm text-gray-500">Available</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Schedule;