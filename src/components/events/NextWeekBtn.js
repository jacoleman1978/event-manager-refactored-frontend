import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const NextWeekBtn = (props) => {
    let {viewType} = props;
    let {week} = useParams();
    let navigate = useNavigate();
    
    const handleNextBtnClick = () => {
        navigate(`/events/${viewType}/${parseInt(week) + 1}`)
    }

    return (
        <>
            <Button 
                className="week-btn-width"
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