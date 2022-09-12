import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

// Called from OffsetButtonGroup.js
const PreviousBtn = ({viewType}) => {
    let navigate = useNavigate();

    let offsetBy = 0;

    // Gets the url param depending on viewType
    if (viewType === 'week') {
        let { week } = useParams();
        offsetBy = week;
    } else if (viewType === 'day') {
        let { day } = useParams();
        offsetBy = day;
    } 

    // When the button is clicked, navigate to the previous week or day, depending on viewType
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