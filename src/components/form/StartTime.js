import React from "react";
import { Form } from "react-bootstrap";

const StartTime = ({formStartTime, setStartTime, label}) => {
    // Displays and maintains start time state
    return (
        <div className="flex-left-center-no-gap">
            <Form.Label className="flex-left-bold">{label}</Form.Label>
            <Form.Control 
                type="time" 
                required 
                className="dropdown-width"
                defaultValue={formStartTime}
                onChange={(e) => setStartTime(e.target.value)}
            />
        </div>
    )
}

export default StartTime;