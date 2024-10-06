// CalendarExample.tsx
import React, { useEffect, useRef } from 'react';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

const CalendarExample: React.FC = () => {
  const calendarRef = useRef<any>(null);

  useEffect(() => {
    const calendarInstance = calendarRef.current.getInstance();

    // Adding initial events
    calendarInstance.createEvents([
      {
        id: '1',
        calendarId: 'cal1',
        title: 'Morning Workout',
        category: 'time',
        start: new Date().toISOString().split('T')[0] + 'T07:00:00',
        end: new Date().toISOString().split('T')[0] + 'T08:00:00',
      },
      {
        id: '2',
        calendarId: 'cal2',
        title: 'Team Meeting',
        category: 'time',
        start: new Date().toISOString().split('T')[0] + 'T10:00:00',
        end: new Date().toISOString().split('T')[0] + 'T11:30:00',
      },
      {
        id: '3',
        calendarId: 'cal1',
        title: 'Lunch with Sarah',
        category: 'time',
        start: new Date().toISOString().split('T')[0] + 'T12:30:00',
        end: new Date().toISOString().split('T')[0] + 'T13:30:00',
      },
    ]);
  }, []);

  return (
    <div style={{ height: '600px' }}>
      <Calendar
        ref={calendarRef}
        height="100%"
        view="week"
        useDetailPopup={true}
        calendars={[
          {
            id: 'cal1',
            name: 'Personal',
            color: '#ffffff',
            bgColor: '#9e5fff',
            dragBgColor: '#9e5fff',
            borderColor: '#9e5fff',
          },
          {
            id: 'cal2',
            name: 'Work',
            color: '#ffffff',
            bgColor: '#00a9ff',
            dragBgColor: '#00a9ff',
            borderColor: '#00a9ff',
          },
        ]}
        taskView={true}
        scheduleView={['time', 'allday']}
        template={{
          monthDayname: (dayname) => `<span>${dayname}</span>`,
        }}
        onBeforeCreateEvent={(eventData) => {
          console.log('Creating event:', eventData);
          calendarRef.current.createEvents([{ ...eventData, id: Date.now() }]);
        }}
        onBeforeUpdateEvent={(updateData) => {
          const { event, changes } = updateData;
          console.log('Updating event:', event.id);
          calendarRef.current.updateEvent(event.id, event.calendarId, changes);
        }}
        onBeforeDeleteEvent={(event) => {
          console.log('Deleting event:', event.id);
          calendarRef.current.deleteEvent(event.id, event.calendarId);
        }}
      />
    </div>
  );
};

export default CalendarExample;
