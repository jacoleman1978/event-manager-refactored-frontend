import React from "react";

const FifteenMin = (props) => {
    let {hour, time, event} = props;

    return (
        <>
            <div id={`${hour}:${time}`} key={`${hour}:${time}`} className="cell-border flex-right">{time}</div>
            <div id={`${hour}:${time}-${event.name}`} key={`${hour}:${time}-${event.name}`} className="cell-border flex-left"></div>
        </>
    )
}

export default FifteenMin;