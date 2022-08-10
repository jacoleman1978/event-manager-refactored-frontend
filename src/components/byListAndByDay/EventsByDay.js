import React from "react";
import EventGroup from "./EventGroup";
import getDayDifference from "../../helpers/getDayDifference";

const EventsByDay = (props) => {
    // Get props
    let {events} = props;

    // Create arrays to hold events for today plus additional days, up to a week total
    let groupEventsList = [];
    let eventsToday = [];
    let eventsPlusOne = [];
    let eventsPlusTwo = [];
    let eventsPlusThree = [];
    let eventsPlusFour = [];
    let eventsPlusFive = [];
    let eventsPlusSix = [];

    // Sorts events by day of week and pushes them to the appropriate array
    const sortByDay = (event) => {
        let daysUntilStart = getDayDifference(event.allDay.startDate);
        let daysUntilDue = getDayDifference(event.allDay.endDate);

        if (daysUntilStart <= 0 && daysUntilDue >= 0) {
            eventsToday.push(event);
        } 
        
        if (daysUntilStart <= 1 && daysUntilDue >= 1) {
            eventsPlusOne.push(event);
        } 
        
        if (daysUntilStart <= 2 && daysUntilDue >= 2) {
            eventsPlusTwo.push(event);
        } 
        
        if (daysUntilStart <= 3 && daysUntilDue >= 3) {
            eventsPlusThree.push(event);
        } 
        
        if (daysUntilStart <= 4 && daysUntilDue >= 4) {
            eventsPlusFour.push(event);
        } 
        
        if (daysUntilStart <= 5 && daysUntilDue >= 5) {
            eventsPlusFive.push(event);
        } 
        
        if (daysUntilStart <= 6 && daysUntilDue >= 6) {
            eventsPlusSix.push(event);
        }
    }

    // Iterating througt all of the events using the sorting function
    for (let event of events) {
        sortByDay(event);
    }

    // Create an array of arrays, representing the sorted events
    let sortedEvents = [eventsToday, eventsPlusOne, eventsPlusTwo, eventsPlusThree, eventsPlusFour, eventsPlusFive, eventsPlusSix];

    // Define titles of day headers
    let dayHeaders = [];
    let date = new Date();
    let day = date.getDate();

    for (let i = 0; i < 7; i++) {
        let headerDate = date
        headerDate.setDate(day + i);
        dayHeaders.push(headerDate.toLocaleDateString('en-us', { weekday:"long", month:"long", day:"numeric"}));
    }

    // Header background color
    let headerColors = ['red', 'orange', 'yellow', 'lightgreen', 'lightblue', 'lavender', 'lightgray']

    let data = [];

    // Make an EventGroup by day, passing in header and appropriate data as props
    groupEventsList = dayHeaders.map((dateString, index) => {
        data = sortedEvents[index];
        let headerStyle = {backgroundColor: headerColors[index], borderRadius: "0.5rem"}
        return (
            <EventGroup key={index} header={dateString} data={data} headerStyle={headerStyle} sort={"list"} />
        )
    })

    return (
        <div>
            {groupEventsList}
        </div>
    )
}

export default EventsByDay;