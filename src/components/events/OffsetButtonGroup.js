import React from "react";
import PreviousBtn from "./PreviousBtn";
import NextBtn from "./NextBtn";

// Called from EventsByDay.js and EventsByWeek.js
const OffsetButtonGroup = ({viewType}) => {
    return (
        <div className="offset-btn-group">
            <PreviousBtn viewType={viewType}/>
            <NextBtn viewType={viewType}/>
        </div>
    )
}

export default OffsetButtonGroup;