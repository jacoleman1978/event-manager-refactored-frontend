import React from "react";
import StartDate from "./StartDate";
import EndDate from "./EndDate";

const DateRange = ({formStartDate, setStartDate, formEndDate, setEndDate}) => {
    return (
        <div className="flex-left-center-wrap">
            <StartDate formStartDate={formStartDate} setStartDate={setStartDate} label={"Start Date: "} />

            <EndDate formEndDate={formEndDate} setEndDate={setEndDate} label={"End Date: "} />
        </div>
    )
}

export default DateRange;