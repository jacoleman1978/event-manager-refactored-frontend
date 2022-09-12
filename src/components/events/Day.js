import React, { useState, useEffect, useContext } from "react";
import { CurrentUser } from "../../contexts/currentUser";
import EventDataService from "../../services/eventDataService";
import Hour from "./Hour";
import EventGroup from "./EventGroup";
import getSortedEventsByUser from "../../helpers/getSortedEventsByUser";
import getSortedEventsByHour from "../../helpers/getSortedEventsByHour";

// Called from EventsByDay.js
const Day = ({dateRange, viewType}) => {
    const { currentUser } = useContext(CurrentUser);

    let [date, setDate] = useState("");
    let [reloadToggle, setReloadToggle] = useState(false);
    let [allDayEvents, setAllDayEvents] = useState([]);
    let [timeRangeEvents, setTimeRangeEvents] = useState([]);
    let [hoursDisplay, setHoursDisplay] = useState([]);

    // If the date has changed, reload data
    if (date.startDate !== dateRange.startDate) {
        setDate(dateRange);
        setReloadToggle(!reloadToggle)
    }

    // On intial loading of the page, event data is retrieved, sorted and filtered for display
    useEffect(() => {
        EventDataService.GetEvents().then((res) => {
            let events = res.data.events;

            // Takes the user's events and all the group members of that user and returns an object with userId keys
            let eventsSortedByUser = getSortedEventsByUser(dateRange, events, currentUser);

            let eventsForDay = eventsSortedByUser[currentUser.userId].events

            // If there are events, sort them into allDay events and events with a time range
            let tempAllDay = [];
            let tempTimeRange = [];

            if (eventsForDay.length > 0 ) {
                for (let event of eventsForDay) {
                    if (event.allDay.isIt) {
                        tempAllDay = [...tempAllDay, event];
                    } else {
                        tempTimeRange = [...tempTimeRange, event];
                    }
                }
            }

            setAllDayEvents(tempAllDay);
            setTimeRangeEvents(tempTimeRange);
        })
    }, [reloadToggle])

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
        
    }, [timeRangeEvents, allDayEvents])

    let headerStyle = {
        backgroundColor: "cornflowerblue", 
        borderRadius: "0.5rem",
        margin: "0.5rem 0.5rem 0rem 0.5rem"
    };

    return (
        <>
            <EventGroup key={"all-day-events"} header={"All Day Events"} data={allDayEvents} headerStyle={headerStyle} viewType={viewType} />
            <div className="outline sm-top-padding">
                {hoursDisplay}
            </div>
            
        </>
    )
    }

export default Day;