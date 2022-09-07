import React from "react";
import { Form } from "react-bootstrap";

// Called from EventSettings.js
const DefaultStartTimeSelector = ({setStartTime, formStartTime}) => {
    return (
        <Form.Group className="flex-between-center" controlId="formStartTime">
            <Form.Label className="flex-left-bold">Start Time: </Form.Label>
            <Form.Select 
                className="dropdown-width" 
                aria-label="Select a default start time" 
                required 
                onChange={(e) => setStartTime(e.target.value)}
                value={formStartTime}
            >
                <option value="" disabled>Select a default start time</option>
                <option value="Now">Now</option>
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

export default DefaultStartTimeSelector;