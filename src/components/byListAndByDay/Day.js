import React from "react";
import Hour from "./Hour";

const Day = (props) => {
    let {event} = props;

    let hourLabels = []

    for (let i = 0; i < 24; i++) {
        hourLabels = [...hourLabels, i];
    }

    let hours = hourLabels.map((hour) => {
        return (
            <Hour key={`${hour}-hour`} hour={hour} event={event}/>
        )
    })
    return (
        <>
            {hours}
        </>
    )
}

export default Day;