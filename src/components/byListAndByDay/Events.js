import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { CurrentUser } from "../../contexts/currentUser";
import EventDataService from "../../services/eventDataService";
import EventsByList from "./EventsByList";
import WeekHeader from "./WeekHeader";
import EventsByWeek from "./EventsByWeek";
import EventsByDay from "./EventsByDay";
import EventsByOverview from "../byOverview/EventsByOverview";
import EventForm from "./EventForm";
import getSortedEventsByUser from "../../helpers/getSortedEventsByUser";
import getDateRange from "../../helpers/getDateRange";

// Called from DisplayContainer.js
const Events = (props) => {
    let {viewType, settings} = props;

    const { currentUser } = useContext(CurrentUser);

    let offsetBy = 0;

    if (viewType === 'week') {
        let { week } = useParams();
        offsetBy = week;
    } else if (viewType === 'day') {
        let { day } = useParams();
        offsetBy = day;
    }

    let [events, setEvents] = useState([]);
    let [eventsLoaded, setEventsLoaded] = useState(false);
    let [dateRangeEventsByUser, setDateRangeEventsByUser] = useState(null);

    useEffect(() => {
        if (eventsLoaded === false) {
            let dateRange = getDateRange(viewType, offsetBy);

            // If events have not been fetched, retrieve them
            if (events.length === 0) {
                EventDataService.GetEvents().then((res) => {
                    setEvents(res.data.events)
                })
            }

            // If events have been fetched, set the loaded flag and sort the events
            if (events.length > 0) {
                setEventsLoaded(true);

                let sortedEvents = getSortedEventsByUser(dateRange, events);

                setDateRangeEventsByUser(sortedEvents);
            }
        }

    }, [events, currentUser])

    const selectView = () => {
        if (eventsLoaded && currentUser !== null && dateRangeEventsByUser !== null) {
            let userId = currentUser.userId;

            let weeklyDisplay = [];

            for (let user in dateRangeEventsByUser) {
                weeklyDisplay = [...weeklyDisplay, <EventsByWeek key={user} settings={settings} events={dateRangeEventsByUser[user]} />]
            }

            if (viewType === 'list') {
                return <EventsByList settings={settings} events={dateRangeEventsByUser[userId]} />
            } else if (viewType === 'week') {
                return (
                <>
                    <WeekHeader offsetBy={offsetBy}/>
                    {weeklyDisplay}
                </>
                )
            } else if (viewType === 'overview') {
                return <EventsByOverview settings={settings} events={events} />
            } else if (viewType === 'day') {
                return <EventsByDay settings={settings} events={dateRangeEventsByUser[userId]["events"]} />
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