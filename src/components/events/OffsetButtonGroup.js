import React from "react";
import PreviousWeekBtn from "./PreviousWeekBtn";
import NextWeekBtn from "./NextWeekBtn";

const OffsetButtonGroup = (props) => {
    let {viewType} = props;

    return (
        <div className="week-btn-group">
            <PreviousWeekBtn viewType={viewType} />
            <NextWeekBtn viewType={viewType} />
        </div>
    )
}

export default OffsetButtonGroup;