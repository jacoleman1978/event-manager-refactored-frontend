import React, { useState, useEffect } from "react";
import EventDataService from "../../services/eventDataService";
import EventsByList from "./EventsByList";
import EventsByDay from "./EventsByDay";
import EventsByOverview from "../byOverview/EventsByOverview";
import EventForm from "./EventForm";
import getDayDifference from "../../helpers/getDayDifference";

const Events = (props) => {
    let {viewType, settings} = props;

    let [events, setEvents] = useState([]);
    let [eventsLoaded, setEventsLoaded] = useState(false);
    let [sortedEvents, setSortedEvents] = useState([]);

    useEffect(() => {
        if (eventsLoaded === false) {
            if (events.length === 0) {
                EventDataService.GetEvents().then((res) => {
                    setEvents(res.data.events)
                })
            }
    
            if (events.length > 0) {
                setEventsLoaded(true);

                // Iterating through all of the events using the sorting function
                for (let event of events) {
                    sortByDay(event);
                }

                // Create an array of arrays, representing the sorted events
                setSortedEvents([eventsToday, eventsPlusOne, eventsPlusTwo, eventsPlusThree, eventsPlusFour, eventsPlusFive, eventsPlusSix]);
            }
        }
    }, [events])


    // Create arrays to hold events for today plus additional days, up to a week total
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

    const selectView = (viewType) => {
        if (eventsLoaded) {
            if (viewType === 'list') {
                return <EventsByList settings={settings} sortedEvents={sortedEvents} />
            } else if (viewType === 'overview') {
                return <EventsByOverview settings={settings} events={events} />
            } else if (viewType === 'day') {
                return <EventsByDay settings={settings} sortedEvents={sortedEvents[0]} />
            } else if (viewType === 'new') {
                return <EventForm settings={settings} isEdit={false}/>
            } else if (viewType === 'edit') {
                return <EventForm settings={settings} isEdit={true}/>
            }
        }
    }

    return (
        <>
            {selectView(viewType)}
        </>
    )
}

export default Events;