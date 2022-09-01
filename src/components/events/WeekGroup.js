import React from "react";
import EventRow from "./EventRow";

// Called from Week.js
const WeekGroup = ({events}) => {
    // eventsList will be filled in the conditional below
    let eventsList =[];

    // If the data passed in has data in it, send each event to the the EventRow React Component. Otherwise pass in an object that will display 'No events found' under the priority.
    if (events.length > 0) {
        eventsList = events.map((event) => {
            return (
                <li key={`${event._id}`} >
                    <div>
                        <EventRow event={event} isWeek={true}/>
                    </div>
                </li>
            )
        });
    } else {
        eventsList = [
            <li key={0}>
                {"No tasks found"}
            </li>
        ];
    }

    // headerStyle was passed in as prop from EventList and determines the background color of each header.
    return (
        <ul style={{marginLeft: "0rem"}}>
            {eventsList}
        </ul>
    )
}

export default WeekGroup;