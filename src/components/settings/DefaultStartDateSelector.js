import React from "react";
import { Form } from "react-bootstrap";

// Called from EventSettings.js
// Displays and maintains state using a dropdown list for start date offset
const DefaultStartDateSelector = ({setStartDate, formStartDate}) => {
    return (
        <Form.Group className="flex-between-center" controlId="formStartDate">
            <Form.Label className="flex-left-bold">Start Date: </Form.Label>
            <Form.Select 
                className="dropdown-width" 
                aria-label="Select a default start date" 
                required 
                onChange={(e) => setStartDate(e.target.value)}
                value={formStartDate}
            >
                <option value="" disabled>Select a default start date</option>
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Next Week">Next Week</option>
            </Form.Select>
        </Form.Group>
    )
}

export default DefaultStartDateSelector;