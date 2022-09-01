import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


// Called from OffsetButtonGroup.js
const PreviousBtn = ({viewType}) => {
    let offsetBy = 0;

    if (viewType === 'week') {
        let { week } = useParams();
        offsetBy = week;
    } else if (viewType === 'day') {
        let { day } = useParams();
        offsetBy = day;
    } 

    let navigate = useNavigate();
    
    const handlePreviousBtnClick = () => {
        navigate(`/events/${viewType}/${parseInt(offsetBy) - 1}`)
    }
    return (
        <>
            <Button 
                className="week-btn-width"
                variant="primary" 
                type="button" 
                onClick={handlePreviousBtnClick} 
            >
                {viewType === 'day' ? "Previous Day" : "Previous Week"}
            </Button>
        </>
    )
}

export default PreviousBtn;