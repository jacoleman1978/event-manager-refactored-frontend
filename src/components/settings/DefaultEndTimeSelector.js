import React from "react";
import { Form } from "react-bootstrap";

// Called from EventSettings.js
// Displays and maintains state using a dropdown list for end time offset
const DefaultEndTimeSelector = ({setEndTime, formEndTime}) => {
    return (
        <Form.Group className="flex-between-center" controlId="formEndTime">
            <Form.Label className="flex-left-bold">End Time: </Form.Label>
            <Form.Select 
                className="dropdown-width" 
                aria-label="Select a default end time" 
                required 
                onChange={(e) => setEndTime(e.target.value)}
                value={formEndTime}
            >
                <option value="" disabled>Select a default end time</option>
                <option value="+15 Minutes">+15 Minutes</option>
                <option value="+30 Minutes">+30 Minutes</option>
                <option value="+45 Minutes">+45 Minutes</option>
                <option value="+1 Hour">+1 Hour</option>
                <option value="+2 Hours">+2 Hours</option>
                <option value="+3 Hours">+3 Hours</option>
                <option value="+4 Hours">+4 Hours</option>
                <option value="+5 Hours">+5 Hours</option>
                <option value="+6 Hours">+6 Hours</option>
            </Form.Select>
        </Form.Group>
    )
}

export default DefaultEndTimeSelector;