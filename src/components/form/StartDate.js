import React from "react";
import { Form } from "react-bootstrap";

// Called by /form/TimeRange.js
const StartDate = ({formStartDate, setStartDate, label}) => {
    // Displays and maintains start date state
    return (
        <div className="flex-left-center-no-gap">
            <Form.Label className="flex-left-bold">{label}</Form.Label>
            <Form.Control 
                type="date" 
                required 
                className="dropdown-width"
                defaultValue={formStartDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
        </div>
    )
}

export default StartDate;