import React, { useState } from "react";
import SimpleView from "../eventViews/SimpleView";
import DetailedView from "../eventViews/DetailedView";

// Called from Hour.js
const FifteenMin = ({hour, fifteenLabel, currentEvents, maximumEventsPerHour}) => {
    let [isSimpleView, setView] = useState(true);

    let time = fifteenLabel.time;

    // Creates the flex grid display using the maximum events that will be displayed per hour for that day
    let dayEventsDisplay = {
        display: "grid",
        gridTemplateColumns: `repeat(${maximumEventsPerHour}, 1fr)`,
        gridTemplateRows: "1fr",
        width: "100%"
    }

    // Clicking on an event title displays a detailed view for the event
    let eventDisplay = currentEvents.map((event) => {
        return (
            <div onClick={() => {setView(!isSimpleView)}} key={`${event._id}-view`} className="flex-left">
                {isSimpleView ? <SimpleView event={event} /> : <DetailedView event={event} type={"event"} />}
            </div>
        )
    })

    return (
        <>
            <div id={`${hour}${time}`} key={`${hour}:${time}-time`} className="cell-border flex-right">{time}</div>
            <div id={`${hour}${time}`} key={`${hour}:${time}-events`} className="cell-border flex-left">
                <div style={dayEventsDisplay}>
                    {eventDisplay}
                </div>
            </div>
        </>
    )
}

export default FifteenMin;