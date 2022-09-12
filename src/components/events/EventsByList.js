import React from "react";
import EventGroup from "./EventGroup";
import OffsetButtonGroup from "./OffsetButtonGroup";
import getSortedEventsByWeek from "./helpers/getSortedEventsByWeek";

// Currently UNUSED: Called from Events.js
const EventsByList = ({events, dateRange, offsetBy, viewType}) => {    
    let sortedEvents = getSortedEventsByWeek(events, dateRange);

    // Define titles of day headers
    let dayHeaders = [];
    let date = new Date();
    let day = date.getDate();

    for (let i = 0; i < 7; i++) {
        let headerDate = new Date(date.getTime())
        headerDate.setDate(day + i + offsetBy * 7);
        dayHeaders.push(headerDate.toLocaleDateString('en-us', { weekday:"long", month:"numeric", day:"numeric"}));
    }

    // Header background color
    let headerColors = ['red', 'orange', 'yellow', 'lightgreen', 'lightblue', 'lavender', 'lightgray']

    let data = [];

    // Make an EventGroup by day, passing in header and appropriate data as props
    let groupEventsList = dayHeaders.map((dateString, index) => {
        data = sortedEvents[index];
        let headerStyle = {backgroundColor: headerColors[index], borderRadius: "0.5rem"};
        return (
            <EventGroup key={index} header={dateString} data={data} headerStyle={headerStyle}/>
        )
    })

    return (
        <div>
            {groupEventsList}
            <OffsetButtonGroup viewType={viewType}/>
        </div>
    )
}

export default EventsByList;