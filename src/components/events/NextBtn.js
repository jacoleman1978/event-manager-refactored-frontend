import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const NextBtn = (props) => {
    let {viewType, nextPrevBtnFlag, setNextPrevBtnFlag} = props;

    let offsetBy = 0;

    if (viewType === 'week' || viewType === 'list') {
        let { week } = useParams();
        offsetBy = week;
    } else if (viewType === 'day') {
        let { day } = useParams();
        offsetBy = day;
    } 

    let navigate = useNavigate();
    
    const handleNextBtnClick = () => {
        setNextPrevBtnFlag(!nextPrevBtnFlag);
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