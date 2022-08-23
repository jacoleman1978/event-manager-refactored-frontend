import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
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
    let [membersList, setMembersList] = useState([]);
    let [membersToDisplay, setMembersToDisplay] = useState([]);
    let [checkboxFlag, setCheckboxFlag] = useState(false);
    let [nextPrevBtnFlag, setNextPrevBtnFlag] = useState(false);

    useEffect(() => {
        if (currentUser !== null) {
            setMembersToDisplay([currentUser.userId]);
        }
    }, [nextPrevBtnFlag])

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
            setMembersList(getGroupMembersChecklist(sortedEvents));

            if (membersToDisplay.length === 0) {
                setMembersToDisplay([currentUser.userId])
            }

            let display = membersToDisplay.map((user) => {
                return (
                    <EventsByWeek key={user} events={sortedEvents[user]} dateRange={dateRange}/>
                )
            })

            setWeeklyDisplay(display);
            setDateRangeEventsByUser(sortedEvents);
        }

    }, [events, currentUser, params, checkboxFlag])

    const getGroupMembersChecklist = (events) => {
        let formattedUserList = [];

        for (let user in events) {
            if (events[user].userId !== currentUser.userId) {
                formattedUserList = [
                    ...formattedUserList, 
                    {
                        userId: events[user].userId,
                        userName: events[user].userName,
                        fullName: events[user].fullName
                    }
                ]
            }
        }

        let checklist = formattedUserList.map((user) => {
            return (
                <li key={`${user.userName}`} className="list-items">
                    <Form.Check 
                        key={`${user.userId}`}
                        type="checkbox"
                        id={`${user.userId}`}
                        onChange={(e) => handleMembersDisplay(user.userId, e)}
                    />
                    {user.fullName}
                </li>
            )
        })

        return checklist
    }

    let tempMembersList = [];

    const handleMembersDisplay = (userId, e) => {
        tempMembersList = membersToDisplay;
        if (e.target.checked === true) {
            tempMembersList = [...tempMembersList, userId];
        } else if (e.target.checked === false) {
            const index = tempMembersList.indexOf(userId);
            if(index > -1) {
                tempMembersList.splice(index, 1);
            }
        }
        setMembersToDisplay(tempMembersList);
        setCheckboxFlag(!checkboxFlag);
    }

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
                    <Form>
                        <Form.Group>
                            <Form.Label className="flex-left-bold">People With Common Events:</Form.Label>
                            <ul>
                                {membersList.length > 0 ? membersList : "None"}
                            </ul>
                                
                        </Form.Group>
                    </Form>
                    <WeekHeader offsetBy={offsetBy}/>
                    {weeklyDisplay}
                    <OffsetButtonGroup viewType={viewType} nextPrevBtnFlag={nextPrevBtnFlag} setNextPrevBtnFlag={setNextPrevBtnFlag} />
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