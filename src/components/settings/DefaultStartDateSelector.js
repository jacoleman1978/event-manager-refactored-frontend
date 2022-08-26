import React from "react";
import { Form } from "react-bootstrap";

// Called from EventSettings.js
const DefaultStartDateSelector = ({setStartDate, formStartDate}) => {
    return (
        <Form.Group className="flex-left-center" controlId="formStartDate">
            <Form.Label>Start Date: </Form.Label>
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