import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

// Called from OffsetButtonGroup.js
const NextBtn = ({viewType}) => {
    let offsetBy = 0;

    if (viewType === 'week') {
        let { week } = useParams();
        offsetBy = week;
    } else if (viewType === 'day') {
        let { day } = useParams();
        offsetBy = day;
    } 

    let navigate = useNavigate();
    
    const handleNextBtnClick = () => {
        navigate(`/events/${viewType}/${parseInt(offsetBy) + 1}`)
    }

    return (
        <>
            <Button 
                className="week-btn-width"
                variant="primary" 
                type="button" 
                onClick={handleNextBtnClick} 
            >
                {viewType === 'day' ? "Next Day" : "Next Week"}
            </Button>
        </>
    )
}

export default NextBtn;