import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Week from "./Week";
import UsersWithCommonEvents from "./UsersWithCommonEvents";
import WeekHeader from "./WeekHeader";
import OffsetButtonGroup from "./OffsetButtonGroup";
import EventDataService from "../../services/eventDataService";
import updateCheckedUsers from "../../helpers/updateCheckedUsers";
import getDateRange from "../../helpers/getDateRange";
import getDateOffsetBy from "./helpers/getDateOffsetBy";
import getSortedEventsByUser from "../../helpers/getSortedEventsByUser";
import filterGroupEventsByWeek from "./helpers/filterGroupEventsByWeek";
import filterUserEventsByWeek from "./helpers/filterUserEventsByWeek";

// Called from Events.js
const EventsByWeek = ({viewType, currentUser}) => {
    let [initialLoadComplete, setInitialLoadComplete] = useState(false);
    let [eventsByUser, setEventsByUser] = useState([]);
    let [eventsByGroup, setEventsByGroup] = useState([]);
    let [weeklyDisplay, setWeeklyDisplay] = useState(null);
    let [checkboxAction, setCheckboxAction] = useState({addId: "", removeId: ""});
    let [membersToDisplay, setMembersToDisplay] = useState([]);
    let [checkboxDisplay, setCheckboxDisplay] = useState([]);

    // Uses the viewType and paramater to calculate the number of days offset from today, creating a date range object used to later filter events.
    let offsetBy = getDateOffsetBy(viewType, useParams());
    let dateRange = getDateRange(viewType, offsetBy);

    // On intial loading of the page, event data is retrieved, sorted and filtered for display
    useEffect(() => {
        // EventDataService.GetEvents().then((res) => {
        //     let events = res.data.events;


        //     // Takes the user's events and all the group members of that user and returns an object with userId keys
        //     let eventsSortedByUser = getSortedEventsByUser(dateRange, events, currentUser);

        //     // Takes the events sorted by user and filters to only include events in the date range
        //     let userEventsFilteredByWeek = filterUserEventsByWeek(eventsSortedByUser, dateRange, currentUser);

        //     // Displays only the events for the current week for the logged in user.
        //     setWeeklyDisplay([<Week key={currentUser.userId} events={userEventsFilteredByWeek[currentUser.userId]} />]);

        //     // Sorts through group members and generates a checkbox list of other users sharing common tasks during the date range
        //     setCheckboxDisplay(<UsersWithCommonEvents events={userEventsFilteredByWeek} setCheckboxAction={setCheckboxAction} dateRange={dateRange} />)

        //     setEventsByUser(eventsSortedByUser);
        // })

        EventDataService.GetUserGroupEvents().then((res) => {
            let userEvents = {}
            userEvents[currentUser.userId] = res.data.events[currentUser.userId]

            let userEventsByWeek = filterUserEventsByWeek(userEvents, dateRange, currentUser);
            
            // Displays only the events for the current week for the logged in user.
            let rowsToDisplay = [<Week key={currentUser.userId} events={userEventsByWeek[currentUser.userId]} />];

            setEventsByUser(userEvents);

            let groupEventsByWeek = filterGroupEventsByWeek(res.data.events.groups, dateRange);

            for (let group in groupEventsByWeek) {
                rowsToDisplay = [...rowsToDisplay, <Week key={group} events={groupEventsByWeek[group]} />]
            }

            setWeeklyDisplay(rowsToDisplay);

            setEventsByGroup(groupEventsByWeek);        
        })

        // List of userIds that will have their events displayed for the week
        setMembersToDisplay([currentUser.userId]);

        setInitialLoadComplete(true);
    }, [])

    useEffect(() => {
        // Whenever the url parameter is changed, offsetting the date range, refilter and display the appropriate events
        if (initialLoadComplete) {
            setMembersToDisplay([currentUser.userId]);
            
            let userEventsFilteredByWeek = filterUserEventsByWeek(eventsByUser, dateRange, currentUser);

            let rowsToDisplay = [<Week key={currentUser.userId} events={userEventsFilteredByWeek[currentUser.userId]} />];

            for (let group in eventsByGroup) {
                rowsToDisplay = [...rowsToDisplay, <Week key={group} events={eventsByGroup[group]} />]
            }

            setWeeklyDisplay(rowsToDisplay);

            setCheckboxDisplay(<UsersWithCommonEvents events={userEventsFilteredByWeek} setCheckboxAction={setCheckboxAction} dateRange={dateRange} />)
        }
    }, [offsetBy])

    useEffect(() => {
        // If a user checkbox has been checked or unchecked, update the weekly display grid
        if (checkboxAction.addId !== "" || checkboxAction.removeId !== "") {
            let updatedUsersChecklist = updateCheckedUsers(checkboxAction, membersToDisplay);

            let userEventsFilteredByWeek = filterUserEventsByWeek(eventsByUser, dateRange, currentUser);

            let display = updatedUsersChecklist.map((user) => {
                return (
                    <Week key={user} events={userEventsFilteredByWeek[user]} />
                )
            })

            setWeeklyDisplay(display);
            setMembersToDisplay(updatedUsersChecklist);
        }
    }, [checkboxAction])

    return (
        <>
            {checkboxDisplay}

            <div className="week-wrapper">
                <WeekHeader offsetBy={offsetBy} />
                {weeklyDisplay}
            </div>

            <OffsetButtonGroup viewType={viewType} />
        </>
    )
}

export default EventsByWeek;