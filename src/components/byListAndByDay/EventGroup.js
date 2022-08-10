import React from "react";
import EventRow from "./EventRow";

const EventGroup = (props) => {
    // Props
    const {header, data, headerStyle} = props;

    // eventssList will be filled in the conditional below
    let eventsList =[];

    // Style for each row
    const rowStyle = {
        display: "flex",
        marginTop: "5px",
    }

    // If the data passed in has data in it, send each event to the the EventRow React Component. Otherwise pass in an object that will display 'No events found' under the priority.
    if (data.length > 0) {
        eventsList = data.map((event) => {
            return (
                <li key={`${event._id}-${Math.random() * 1000}`} >
                    <div style={rowStyle}>
                        <EventRow event={event} />
                    </div>
                </li>
            )
        });
    } else {
        const event = {_id: "", title: "No tasks found", allDay: {
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: ""
            }, notes: "", editorIds: [], ownerId: ""}
        eventsList = [
            <li key={0}>
                <EventRow event={event} />
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
            <div style={headerStyle}>
                {header}
            </div>
            <ul>
                {eventsList}
            </ul>
        </div>
    )
}

export default EventGroup;