import React from "react";
import { Form } from "react-bootstrap";

// Called from DetailedView.js
const EndDate = ({formEndDate, setEndDate, label}) => {
    return (
        <div className="flex-left-center-no-gap">
            <Form.Label className="form-label">{label}</Form.Label>
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