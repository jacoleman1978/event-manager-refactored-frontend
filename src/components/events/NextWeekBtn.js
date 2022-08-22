import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const NextWeekBtn = () => {
    let {week} = useParams();
    let navigate = useNavigate();
    
    const handleNextBtnClick = () => {
        navigate(`/events/week/${parseInt(week) + 1}`)
    }

    return (
        <>
            <Button 
                variant="primary" 
                type="button" 
                onClick={handleNextBtnClick} 
            >
                Next Week
            </Button>
        </>
    )
}

export default NextWeekBtn;