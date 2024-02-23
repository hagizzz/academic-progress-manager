import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import { formatDate } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import Header from './Header'

function Calendar() {
    const [currentEvents, setCurrentEvents] = useState([])

    function handleDateClick(selected) {
        const title = prompt('Enter a new title for your event')
        const calendarApi = selected.view.calendar
        calendarApi.unselect()

        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr} - ${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            })
        }
    }

    function handleEventClick(selected) {
        if (window.confirm(`Are you sure you want delete the event '${selected.event.title}'`)) {
            selected.event.remove()
        }
    }

    return (
        <div className="m-5 card w-2/3 shadow-xl p-4">
            <div className="flex space-x-2">
                {/* CALENDAR SIDEBAR */}
                {/* <div className="flex-[1_1_20%] bg-cyan-50 p-4 rounded-md">
                    <p className="text-lg">Events</p>
                    <div>
                        {currentEvents.map((event) => (
                            <div className="bg-cyan-200 my-10 rounded-sm" key={event.id}>
                                <div
                                    primary={event.title}
                                    secondary={
                                        <div>
                                            {formatDate(event.start, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </div>
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* CALENDAR */}
                <div className="flex-[1_1_100%] ml-4">
                    <FullCalendar
                        height="75vh"
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handleDateClick}
                        eventClick={handleEventClick}
                        eventsSet={(events) => setCurrentEvents(events)}
                        initialEvents={[
                            {
                                id: '12315',
                                title: 'All-day event',
                                date: '2022-09-14',
                            },
                            {
                                id: '5123',
                                title: 'Timed event',
                                date: '2022-09-28',
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default Calendar
