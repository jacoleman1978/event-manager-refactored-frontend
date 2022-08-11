import React from "react";
import StartTime from "./StartTime";
import EndTime from "./EndTime";

const TimeRange = (props) => {
    let { formStartTime, setStartTime, formEndTime, setEndTime} = props;

    return (
        <div className="flex-left-center-wrap">
            <StartTime formStartTime={formStartTime} setStartTime={setStartTime} label={"Start Time: "} />

            <EndTime formEndTime={formEndTime} setEndTime={setEndTime} label={"End Time: "} />
        </div>
    )
}

export default TimeRange;