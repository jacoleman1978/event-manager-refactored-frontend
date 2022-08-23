import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { CurrentUser } from "../../contexts/currentUser";
import EventDataService from "../../services/eventDataService";
import EventsByList from "./EventsByList";
import WeekHeader from "./WeekHeader";
import EventsByWeek from "./EventsByWeek";
import EventsByDay from "./EventsByDay";
import EventForm from "./EventForm";
import getSortedEventsByUser from "../../helpers/getSortedEventsByUser";
import getDateRange from "../../helpers/getDateRange";
import OffsetButtonGroup from "./OffsetButtonGroup";

// Called from DisplayContainer.js
const Events = (props) => {
    let {viewType, settings} = props;

    const { currentUser } = useContext(CurrentUser);

    let offsetBy = 0;
    let params = "";

    if (viewType === 'week' || viewType === 'list') {
        let { week } = useParams();
        params = week;
        offsetBy = parseInt(week);
    } else if (viewType === 'day') {
        let { day } = useParams();
        params = day;
        offsetBy = parseInt(day);
    } 

    let dateRange = getDateRange(viewType, offsetBy);

    let [events, setEvents] = useState([]);
    let [eventsLoaded, setEventsLoaded] = useState(false);
    let [dateRangeEventsByUser, setDateRangeEventsByUser] = useState(null);
    let [weeklyDisplay, setWeeklyDisplay] = useState(null);
    let [listEvents, setListEvents] = useState(null);
    let [dayEvents, setDayEvents] = useState(null);

    useEffect(() => {
        if (eventsLoaded === false) {

            // If events have not been fetched, retrieve them
            if (events.length === 0) {
                EventDataService.GetEvents().then((res) => {
                    setEvents(res.data.events)
                })
            }
        }

        // If events have been fetched, set the loaded flag and sort the events
        if (events.length > 0 && currentUser !== null) {
            setEventsLoaded(true);

            let sortedEvents = getSortedEventsByUser(dateRange, events, currentUser);

            setDayEvents(sortedEvents[currentUser.userId]["events"]);
            setListEvents(sortedEvents[currentUser.userId]);

            let display = [];
            for (let user in sortedEvents) {
                display = [...display, <EventsByWeek key={user} events={sortedEvents[user]} dateRange={dateRange}/>]
            }
            setWeeklyDisplay(display);
            setDateRangeEventsByUser(sortedEvents);
        }

    }, [events, currentUser, params])

    const selectView = () => {
        if (eventsLoaded && currentUser !== null && dateRangeEventsByUser !== null) {
            if (viewType === 'list') {
                return (
                    <>
                        <EventsByList events={listEvents} dateRange={dateRange} offsetBy={offsetBy}/>
                        <OffsetButtonGroup viewType={viewType}/>
                    </>
                )
            } else if (viewType === 'week') {
                return (
                <>
                    <WeekHeader offsetBy={offsetBy}/>
                    {weeklyDisplay}
                    <OffsetButtonGroup viewType={viewType}/>
                </>
                )
            } else if (viewType === 'day') {
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
                        <EventsByDay events={dayEvents} viewType={viewType}/>
                    </>
                )
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