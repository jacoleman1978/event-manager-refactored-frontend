import React from "react";
import WeekGroup from "./WeekGroup";
import getSortedEventsByWeek from "../../helpers/getSortedEventsByWeek";

const EventsByWeek = (props) => {
    let {events, dateRange} = props;

    let sortedEvents = getSortedEventsByWeek(events, dateRange)

    let weekEvents = sortedEvents.map((dayEvents, index) => {
        return (
            <div key={index} className="week-day">
                <WeekGroup key={index} events={dayEvents} />
            </div>
        )
    })

    return (
        <>
            {events !== undefined ? 
                <div className="week-row">
                    <div className="week-day">{events.fullName}</div>
                    {weekEvents}
                </div> : ""}
            
        </>
    )
}

export default EventsByWeek;