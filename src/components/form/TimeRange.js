import React from "react";
import StartTime from "./StartTime";
import EndTime from "./EndTime";

// Called by /events/EventForm.js
const TimeRange = ({formStartTime, setStartTime, formEndTime, setEndTime}) => {
    // Displays and maintains state for start time and end time
    return (
        <div className="flex-left-center-wrap xxsmall-gap">
            <div className="flex-left-center-no-gap outline-inner">
                <StartTime formStartTime={formStartTime} setStartTime={setStartTime} label={"Start Time: "} />
            </div>
            

            <div className="flex-left-center-no-gap outline-inner">
                <EndTime formEndTime={formEndTime} setEndTime={setEndTime} label={"End Time: "} />
            </div>
        </div>
    )
}

export default TimeRange;