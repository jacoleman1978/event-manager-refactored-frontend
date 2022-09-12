import React from "react";
import { useParams } from "react-router-dom";
import OffsetButtonGroup from "./OffsetButtonGroup";
import Day from "./Day";
import getDateOffsetBy from "./helpers/getDateOffsetBy";
import getDateRange from "./helpers/getDateRange";

// Called from Events.js
const EventsByDay = ({viewType}) => {
    // Uses the viewType and paramater to calculate the number of days offset from today, creating a date range object used to later filter events.
    let offsetBy = getDateOffsetBy(viewType, useParams());
    let dateRange = getDateRange(viewType, offsetBy);

    // Define titles of day headers
    let date = new Date();
    let day = date.getDate();

    date.setDate(day + offsetBy);
    date.toLocaleDateString('en-us', { weekday:"long", month:"numeric", day:"numeric"});

    let headerStyle = {backgroundColor: "lightcoral", borderRadius: "0.5rem"};

    return (
        <>
            <div style={headerStyle}>{date.toLocaleDateString('en-us', { weekday:"long", month:"numeric", day:"numeric"})}</div>
            <OffsetButtonGroup viewType={viewType}/>
            <Day dateRange={dateRange} viewType={viewType} />
        </>
    )
}

export default EventsByDay;