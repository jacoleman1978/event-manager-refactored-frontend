import React from "react";
import Day from "./Day";

const EventsByDay = (prop) => {

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