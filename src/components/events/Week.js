import React from "react";
import WeekGroup from "./WeekGroup";

// Called from EventsByWeek.js
// events is an array of seven arrays each corresponding to a day within a date range used earlier
const Week = ({events}) => {
    let weekEvents = [];

    // Generate each day cell within the WeekGroup for display
    if (events !== undefined) {
        weekEvents = events.events.map((dayEvents, index) => {
            return (
                <div key={index} className="week-day">
                    <WeekGroup key={index} events={dayEvents} />
                </div>
            )
        })
    } 

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

export default Week;