import React from "react";
import OffsetButtonGroup from "./OffsetButtonGroup";
import Day from "./Day";

// Called from Events.js
const EventsByDay = ({offsetBy, viewType, events}) => {
    // Define titles of day headers
    let date = new Date();
    let day = date.getDate();

    date.setDate(day + offsetBy);
    date.toLocaleDateString('en-us', { weekday:"long", month:"numeric", day:"numeric"});

    let headerStyle = {backgroundColor: "red", borderRadius: "0.5rem"};

    return (
        <>
            <div style={headerStyle}>{date.toLocaleDateString('en-us', { weekday:"long", month:"numeric", day:"numeric"})}</div>
            <OffsetButtonGroup viewType={viewType}/>
            <Day events={events} viewType={viewType}/>
        </>
    )
}

export default EventsByDay;