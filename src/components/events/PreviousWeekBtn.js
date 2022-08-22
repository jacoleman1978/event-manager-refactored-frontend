import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const PreviousWeekBtn = () => {
    let {week} = useParams();
    let navigate = useNavigate();
    
    const handlePreviousBtnClick = () => {
        navigate(`/events/week/${parseInt(week) - 1}`)
    }
    return (
        <>
            <Button 
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