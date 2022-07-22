import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CurrentUser } from "../contexts/currentUser";
import UserDataService from "../services/userDataService";
import TasksByPriority from "./tasks/TasksByPriority";
import TasksByDueDate from "./tasks/TasksByDueDate";
import EventsByList from "./byListAndByDay/EventsByList";
import EventsByOverview from "./byOverview/EventsByOverview";
import EventsByDay from "./byListAndByDay/EventsByDay";
import Groups from "./groups/Groups";
import Settings from "./settings/Settings";

const DisplayContainer = (props) => {
    const navigate = useNavigate();

    // Get currentUser from context
    const { currentUser, setCurrentUser } = useContext(CurrentUser);

    // Props
    const { isTask, isEvent, viewType } = props;

    // If there isn't a user in context, redirect to login
    useEffect(() => {
        if (currentUser === null) {
            UserDataService.CheckSessionUser().then(res => {
                if (res.data === null) {
                    navigate('/auth/login');
                }
            })
        }
    }, [currentUser])

    // Determine view to use in display
    const selectView = (isTask, isEvent, viewType) => {
        if (isTask === true) {
            if (viewType === 'priority') {
                return <TasksByPriority />
            } else if (viewType === 'duedate') {
                return <TasksByDueDate />
            }

        } else if (isEvent === true) {
            if (viewType === 'list') {
                return <EventsByList />
            } else if (viewType === 'overview') {
                return <EventsByOverview />
            } else if (viewType === 'day') {
                return <EventsByDay />
            }

        } else if (viewType === 'groups') {
            return <Groups />

        } else if (viewType === 'settings') {
            return <Settings />
        }
    }

    return (
        <>
            {selectView(isTask, isEvent, viewType)}
        </>
    )
}

export default DisplayContainer;