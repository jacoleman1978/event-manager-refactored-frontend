import React from "react";
import StartDate from "./StartDate";
import EndDate from "./EndDate";

const DateRange = ({formStartDate, setStartDate, formEndDate, setEndDate, formAllDay}) => {
    return (
        <div className="flex-left-center-wrap xxsmall-gap">
            <div className="flex-left-center-no-gap outline-inner">
                <StartDate formStartDate={formStartDate} setStartDate={setStartDate} label={"Start Date: "} />
            </div>
            

            <div className="flex-left-center-no-gap">
                <EndDate formEndDate={formAllDay ? formEndDate : formStartDate} setEndDate={setEndDate} label={"End Date: "} />
            </div>
        </div>
    )
}

export default DateRange;