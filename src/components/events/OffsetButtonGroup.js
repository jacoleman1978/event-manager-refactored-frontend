import React from "react";
import PreviousBtn from "./PreviousBtn";
import NextBtn from "./NextBtn";

const OffsetButtonGroup = (props) => {
    let {viewType, nextPrevBtnFlag, setNextPrevBtnFlag} = props;

    return (
        <div className="offset-btn-group">
            <PreviousBtn viewType={viewType} nextPrevBtnFlag={nextPrevBtnFlag} setNextPrevBtnFlag={setNextPrevBtnFlag} />
            <NextBtn viewType={viewType} nextPrevBtnFlag={nextPrevBtnFlag} setNextPrevBtnFlag={setNextPrevBtnFlag} />
        </div>
    )
}

export default OffsetButtonGroup;