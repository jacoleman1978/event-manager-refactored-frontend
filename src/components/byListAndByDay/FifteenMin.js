import React from "react";


const FifteenMin = (props) => {
    let {hour, fifteenLabel, currentEvents, maximumEventsPerHour} = props;

    let time = fifteenLabel.time;

    let dayEventsDisplay = {
        display: "grid",
        gridTemplateColumns: `repeat(${maximumEventsPerHour}, 1fr)`,
        gridTemplateRows: "1fr",
        width: "100%"
    }

    let eventDisplay = currentEvents.map((event) => {
        return (
            <div key={`${hour}:${time}-${event._id}`} className="flex-left">
                {event.title}
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