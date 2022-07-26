import React, { useState, useEffect, useContext } from "react";
import { CurrentUser } from "../../contexts/currentUser";
import EventsByWeek from "./EventsByWeek";
import EventsByDay from "./EventsByDay";
import EventForm from "./EventForm";

// Called from DisplayContainer.js
const Events = ({viewType, settings}) => {
    const { currentUser } = useContext(CurrentUser);

    let [displayView, setDisplayView] = useState([]);

    useEffect(() => {
        if (currentUser !== null) {
            setDisplayView(selectView(currentUser));
        } 
    }, [currentUser, viewType])

    // Selets the display to use depending on the viewType passed in
    const selectView = (currentUser) => {
        if (viewType === 'week') {
            return <EventsByWeek viewType={viewType} currentUser={currentUser} />

        } else if (viewType === 'day') {
            return <EventsByDay viewType={viewType} currentUser={currentUser} />

        } else if (viewType === 'new') {
            return <EventForm settings={settings} isEdit={false}/>

        } else if (viewType === 'edit') {
            return <EventForm settings={settings} isEdit={true}/>
    
        }
    }

    return (
        <>
            {displayView}
        </>
    )
}

export default Events;