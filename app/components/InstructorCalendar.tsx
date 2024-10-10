// components/InstructorCalendar.js
'use client'
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // para permitir interações como drag and drop

const InstructorCalendar = () => {
    const [events, setEvents] = useState([
        // Exemplos de eventos iniciais
        { id: '1', title: 'Aula de Matemática', start: '2024-10-11T10:00:00', end: '2024-10-11T12:00:00' },
        { id: '2', title: 'Aula de Física', start: '2024-10-12T14:00:00', end: '2024-10-12T16:00:00' },
    ]);

    const handleDateSelect = (selectInfo: {
        startStr: string;
        endStr: string;
        view: {
            calendar: {
                unselect: () => void;
            };
        };
    }) => {
        let title = prompt('Digite o título da aula:');
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect();

        if (title) {
            const newEvent = {
                id: Date.now().toString(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
            };
            setEvents([...events, newEvent]);

        }
    };

    const handleEventClick = (clickInfo: {
        event: {
            id: string;
            title: string;
        };
    }) => {
        if (window.confirm(`Tem certeza que deseja remover a aula '${clickInfo.event.title}'?`)) {
            const newEvents = events.filter(event => event.id !== clickInfo.event.id);
            setEvents(newEvents);
        }
    };

    return (
        <div className="calendar-container">
            <h2>Agenda do Instrutor</h2>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable={true}
                editable={true}
                select={handleDateSelect}
                events={events}
                eventClick={handleEventClick}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                selectMirror={true}
                dayMaxEvents={true}
            />
        </div>
    );
};

export default InstructorCalendar;
