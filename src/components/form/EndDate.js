import React from "react";
import { Form } from "react-bootstrap";

// Called from /eventViews/DetailedView.js, /form/DateRange.js
const EndDate = ({formEndDate, setEndDate, label}) => {
    // Displays and maintains state for the end date
    return (
        <div className="flex-left-center-no-gap outline-inner">
            <Form.Label className="flex-left-bold">{label}</Form.Label>
            <Form.Control 
                type="date" 
                required 
                className="dropdown-width"
                defaultValue={formEndDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
        </div>
    )
}

export default EndDate;