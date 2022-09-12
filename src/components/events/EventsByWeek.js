import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Week from "./Week";
import WeekHeader from "./WeekHeader";
import OffsetButtonGroup from "./OffsetButtonGroup";
import EventDataService from "../../services/eventDataService";
import getDateRange from "./helpers/getDateRange";
import getDateOffsetBy from "./helpers/getDateOffsetBy";
import filterGroupEventsByWeek from "./helpers/filterGroupEventsByWeek";
import filterUserEventsByWeek from "./helpers/filterUserEventsByWeek";

// Called from Events.js
const EventsByWeek = ({viewType, currentUser}) => {
    let [initialLoadComplete, setInitialLoadComplete] = useState(false);
    let [eventsByUser, setEventsByUser] = useState([]);
    let [eventsByGroup, setEventsByGroup] = useState([]);
    let [weeklyDisplay, setWeeklyDisplay] = useState(null);

    // Uses the viewType and paramater to calculate the number of days offset from today, creating a date range object used to later filter events.
    let offsetBy = getDateOffsetBy(viewType, useParams());
    let dateRange = getDateRange(viewType, offsetBy);

    // On intial loading of the page, event data is retrieved, sorted and filtered for display
    useEffect(() => {
        EventDataService.GetUserGroupEvents().then((res) => {
            let userEvents = {}
            userEvents[currentUser.userId] = res.data.events[currentUser.userId]

            let userEventsByWeek = filterUserEventsByWeek(userEvents, dateRange, currentUser);
            
            // Displays only the events for the current week for the logged in user.
            let rowsToDisplay = [<Week key={currentUser.userId} events={userEventsByWeek[currentUser.userId]} />];

            setEventsByUser(userEvents);

            let groupEvents = {};
            groupEvents = res.data.events.groups;

            // Displays only th events for the current week for groups to which the user belongs
            let groupEventsByWeek = filterGroupEventsByWeek(res.data.events.groups, dateRange);

            for (let group in groupEventsByWeek) {
                rowsToDisplay = [...rowsToDisplay, <Week key={group} events={groupEventsByWeek[group]} />]
            }

            setWeeklyDisplay(rowsToDisplay);

            setEventsByGroup(groupEvents);        
        })

        setInitialLoadComplete(true);
    }, [])

    useEffect(() => {
        // Whenever the url parameter is changed, offsetting the date range, refilter and display the appropriate events
        if (initialLoadComplete) {
            let userEventsFilteredByWeek = filterUserEventsByWeek(eventsByUser, dateRange, currentUser);

            let groupEventsFilteredByWeek = filterGroupEventsByWeek(eventsByGroup, dateRange);

            let rowsToDisplay = [<Week key={currentUser.userId} events={userEventsFilteredByWeek[currentUser.userId]} />];

            for (let group in groupEventsFilteredByWeek) {
                rowsToDisplay = [...rowsToDisplay, <Week key={group} events={groupEventsFilteredByWeek[group]} />]
            }

            setWeeklyDisplay(rowsToDisplay);
        }
    }, [offsetBy])

    return (
        <>
            <div className="week-wrapper">
                <WeekHeader offsetBy={offsetBy} />
                {weeklyDisplay}
            </div>

            <OffsetButtonGroup viewType={viewType} />
        </>
    )
}

export default EventsByWeek;