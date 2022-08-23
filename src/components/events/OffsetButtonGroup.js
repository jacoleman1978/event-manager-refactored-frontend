import React from "react";
import PreviousBtn from "./PreviousBtn";
import NextBtn from "./NextBtn";

const OffsetButtonGroup = (props) => {
    let {viewType} = props;

    return (
        <div className="offset-btn-group">
            <PreviousBtn viewType={viewType} />
            <NextBtn viewType={viewType} />
        </div>
    )
}

export default OffsetButtonGroup;