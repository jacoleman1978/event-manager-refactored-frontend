import React from "react";
import EventRow from "./EventRow";

// Called from Day.js
const EventGroup = ({header, data, headerStyle, viewType}) => {
    // eventsList will be filled in the conditional below
    let eventsList =[];

    // If data was passed in, send each event to the the EventRow React Component. Otherwise pass in an object that will display 'No events found' under the priority.
    if (data !== 'undefined') {
        eventsList = data.map((event) => {
            return (
                <li key={event._id} className="list-items">
                    <div>
                        <EventRow event={event} isWeek={false}/>
                    </div>
                </li>
            )
        });
    } else if (viewType === "day") {
        eventsList = [
            <li key={0} className="list-items">
                {"No events found"}
            </li>
        ];
    } else {
        eventsList = [
            <li key={0} className="list-items">
                {"No tasks found"}
            </li>
        ];
    }

    // headerStyle was passed in as prop from EventList and determines the background color of each header.
    return (
        <div className="outline">
            {header.length > 0 ? <div style={headerStyle}>{header}</div> : ""}
            
            <ul className="week-wrapper small-gap">
                {eventsList}
            </ul>
        </div>
    )
}

export default EventGroup;