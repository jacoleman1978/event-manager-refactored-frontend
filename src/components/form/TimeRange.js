import React from "react";
import StartTime from "./StartTime";
import EndTime from "./EndTime";

const TimeRange = (props) => {
    let { formStartTime, setStartTime, formEndTime, setEndTime} = props;

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