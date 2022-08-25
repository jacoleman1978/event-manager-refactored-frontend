import React from "react";
import { Form } from "react-bootstrap";

// Functionality not implemented yet...would be called from ViewSettings.js
const WeekStartsOnSelector = ({setStartWeek, formStartWeek}) => {
    return (
        <Form.Group className="flex-left-center" controlId="formStartWeek">
            <Form.Label>Week Starts On: </Form.Label>
            <Form.Select 
                className="dropdown-width" 
                aria-label="Select a default start of week" 
                required 
                onChange={(e) => setStartWeek(e.target.value)}
                value={formStartWeek}
            >
                <option value="" disabled>Select a default day</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
            </Form.Select>
        </Form.Group>
    )
}

export default WeekStartsOnSelector;