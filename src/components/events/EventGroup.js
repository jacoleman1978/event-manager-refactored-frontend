import React from "react";
import EventRow from "./EventRow";

const EventGroup = (props) => {
    const {header, data, headerStyle} = props;

    // eventssList will be filled in the conditional below
    let eventsList =[];

    // Style for each row
    const rowStyle = {
        display: "flex",
        marginTop: "5px",
    }

    // If the data passed in has data in it, send each event to the the EventRow React Component. Otherwise pass in an object that will display 'No events found' under the priority.
    if (data !== 'undefined') {
        eventsList = data.map((event) => {
            return (
                <li key={`${event._id}-${Math.random() * 1000}`} >
                    <div style={rowStyle}>
                        <EventRow event={event} isWeek={false}/>
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

    // Style for the GroupEvent
    const groupStyle = {
        margin: "1rem 0rem"
    }

    // headerStyle was passed in as prop from EventList and determines the background color of each header.
    return (
        <div style={groupStyle}>

            {header.length > 0 ? <div style={headerStyle}>{header}</div> : ""}
            
            <ul>
                {eventsList}
            </ul>
        </div>
    )
}

export default EventGroup;