import React, { useState } from "react";
import Hour from "./Hour";
import EventGroup from "./EventGroup";

// Called from Events.js
const EventsByDay = (props) => {
    let {events} = props;

    let [isSorted, setIsSorted] = useState(false);
    let [allDayEvents, setAllDayEvents] = useState([]);
    let [timeRangeEvents, setTimeRangeEvents] = useState([]);

    if (events.length > 0 && isSorted === false) {
        for (let event of events) {
            if (event.allDay.isIt) {
                setAllDayEvents(allDayEvents => [...allDayEvents, event]);
            } else {
                setTimeRangeEvents(timeRangeEvents => [...timeRangeEvents, event]);
            }
        }
        
        setIsSorted(true)
    }

    let hourLabels = [];

    for (let i = 0; i < 24; i++) {
        hourLabels = [...hourLabels, i];
    }

    let hours = hourLabels.map((hour) => {
        let eventsThisHour = [];

        for (let event of timeRangeEvents) {
            let eventHour = event.allDay.startTime.split(":");
            
            if (eventHour[0] === hour) {
                eventsThisHour = [...eventsThisHour, event];
            }
        }

        if (eventsThisHour.length > 0) {
            return (
                <Hour key={`${hour}`} hour={hour} event={eventsThisHour}/>
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

    let headerStyle = {backgroundColor: "cornflowerblue", borderRadius: "0.5rem"};

    return (
        <>
            <EventGroup key={"all-day-events"} header={"All Day Events"} data={allDayEvents} headerStyle={headerStyle} />
            {hours}
        </>
    )
    }

export default EventsByDay;