import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Hour from "./Hour";
import EventGroup from "./EventGroup";
import getSortedEventsByHour from "../../helpers/getSortedEventsByHour";

// Called from EventsByDay.js
const Day = (props) => {
    let {day} = useParams();

    let {events} = props;

    let [allDayEvents, setAllDayEvents] = useState([]);
    let [timeRangeEvents, setTimeRangeEvents] = useState([]);
    let [hoursDisplay, setHoursDisplay] = useState([]);

    useEffect(() => {
        // If there are events, sort them into allDay events and events with a time range
        if (events.length > 0 ) {
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
        }
    }, [events, day])

    useEffect(() => {
        let sortedEvents = getSortedEventsByHour(timeRangeEvents);

        // Find the maximum number of events that will be displayed during the same hour
        let maximumEventsPerHour = 0;

        for (let group of sortedEvents) {
            if (group.events.length > maximumEventsPerHour) {
                maximumEventsPerHour = group.events.length;
            }
        }

        // Create the hoursDisplay array
        let hours = sortedEvents.map((hourGroup) => {
            let hour = hourGroup.hour;
            let eventsThisHour = hourGroup.events;

            if (eventsThisHour.length > 0) {
                return (
                    <Hour key={`${hour}`} hour={hour} events={eventsThisHour} maximumEventsPerHour={maximumEventsPerHour}/>
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
        
    }, [day])

    let headerStyle = {backgroundColor: "cornflowerblue", borderRadius: "0.5rem"};

    return (
        <>
            <EventGroup key={"all-day-events"} header={"All Day Events"} data={allDayEvents} headerStyle={headerStyle} />
            {hoursDisplay}
        </>
    )
    }

export default Day;