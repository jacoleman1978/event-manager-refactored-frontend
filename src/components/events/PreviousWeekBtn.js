import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const PreviousWeekBtn = (props) => {
    let {viewType} = props;
    let {week} = useParams();
    let navigate = useNavigate();
    
    const handlePreviousBtnClick = () => {
        navigate(`/events/${viewType}/${parseInt(week) - 1}`)
    }
    return (
        <>
            <Button 
                className="week-btn-width"
                variant="primary" 
                type="button" 
                onClick={handlePreviousBtnClick} 
            >
                Previous Week
            </Button>
        </>
    )
}

export default PreviousWeekBtn;