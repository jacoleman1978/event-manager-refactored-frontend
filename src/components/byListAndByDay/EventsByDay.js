import React from "react";
import Day from "./Day";

const EventsByDay = (props) => {
    let { sortedEvents } = props;
    console.log(sortedEvents)

    let event = {
        _id: Math.random(),
        name: "event name"
    }

    return (
        <>
            <Day event={event} />
        </>
    )
}

export default EventsByDay;