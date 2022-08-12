import React, { useState, useEffect } from "react";
import Hour from "./Hour";
import EventGroup from "./EventGroup";

// Called from Events.js
const EventsByDay = (props) => {
    let {events} = props;

    let [isSorted, setIsSorted] = useState(false);
    let [allDayEvents, setAllDayEvents] = useState([]);
    let [timeRangeEvents, setTimeRangeEvents] = useState([]);
    let [hoursDisplay, setHoursDisplay] = useState([]);

    let hourLabels = [];

    useEffect(() => {
        if (events.length > 0 && isSorted === false) {
            let tempAllDay = [];
            let tempTimeRange = [];

            for (let event of events) {
                if (event.allDay.isIt) {
                    tempAllDay = [...tempAllDay, event];
                } else {
                    tempTimeRange = [...tempTimeRange, event];
                }
            }

            setAllDayEvents(tempAllDay);
            setTimeRangeEvents(tempTimeRange);
            
            setIsSorted(true)
        }
    }, [events])

    useEffect(() => {
        if (isSorted && hoursDisplay.length === 0) {
            for (let i = 0; i < 24; i++) {
                hourLabels = [...hourLabels, i];
            }

            let hours = hourLabels.map((hour) => {
                let eventsThisHour = [];
        
                for (let event of timeRangeEvents) {
                    let eventStartSplit = event.allDay.startTime.split(":");
                    let eventStartHour = parseInt(eventStartSplit[0]);
                    let eventEndSplit = event.allDay.endTime.split(":");
                    let eventEndHour = parseInt(eventEndSplit[0]);
                    let eventEndMinutes = parseInt(eventEndSplit[1]);
                    
                    if (hour >= eventStartHour && hour <= eventEndHour) {
                        if (hour < eventEndHour) {
                            eventsThisHour = [...eventsThisHour, event];
                        } else if (hour === eventEndHour && eventEndMinutes > 0) {
                            eventsThisHour = [...eventsThisHour, event];
                        }
                    }
                }
        
                if (eventsThisHour.length > 0) {
                    return (
                        <Hour key={`${hour}`} hour={hour} events={eventsThisHour} />
                    )
                } else {
                    return (
                        <div key={`${hour}`} className="collapsed-hour-grid">
                            <div className="cell-border flex-right">{`${hour}:00`}</div>
                            <div className="cell-border flex-left"></div>
                        </div>
                    )
                }
            })

            setHoursDisplay(hours)
        }
    }, [isSorted])

    let headerStyle = {backgroundColor: "cornflowerblue", borderRadius: "0.5rem"};

    return (
        <>
            <EventGroup key={"all-day-events"} header={"All Day Events"} data={allDayEvents} headerStyle={headerStyle} />
            {hoursDisplay}
        </>
    )
    }

export default EventsByDay;