import React, { useState } from "react";
import SimpleView from "../eventViews/SimpleView";
import DetailedView from "../eventViews/DetailedView";

const FifteenMin = (props) => {
    let {hour, fifteenLabel, currentEvents, maximumEventsPerHour} = props;

    let [isSimpleView, setView] = useState(true);

    let time = fifteenLabel.time;

    let dayEventsDisplay = {
        display: "grid",
        gridTemplateColumns: `repeat(${maximumEventsPerHour}, 1fr)`,
        gridTemplateRows: "1fr",
        width: "100%"
    }

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