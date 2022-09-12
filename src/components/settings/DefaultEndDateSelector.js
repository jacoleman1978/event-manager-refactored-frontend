import React from "react";
import { Form } from "react-bootstrap";

// Called from EventSettings.js
// Displays and maintains state using a dropdown list for end date offset
const DefaultEndDateSelector = ({setEndDate, formEndDate}) => {
    return (
        <Form.Group className="flex-between-center" controlId="formEndDate">
            <Form.Label className="flex-left-bold">End Date: </Form.Label>
            <Form.Select 
                className="dropdown-width" 
                aria-label="Select a default end date" 
                required 
                onChange={(e) => setEndDate(e.target.value)}
                value={formEndDate}
            >
                <option value="" disabled>Select a default end date</option>
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Next Week">Next Week</option>
            </Form.Select>
        </Form.Group>
    )
}

export default DefaultEndDateSelector;