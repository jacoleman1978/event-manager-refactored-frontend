import React from "react";
import { Form } from "react-bootstrap";

// Called from EventSettings.js
const DefaultTaskPriority = ({setPriority, formTaskPriority}) => {
    return (
        <Form.Group className="flex-between-center" controlId="formTaskPriority">
            <Form.Label className="flex-left-bold">Task Priority: </Form.Label>
            <Form.Select 
                className="dropdown-width" 
                aria-label="Select a default task priority" 
                required 
                onChange={(e) => setPriority(e.target.value)}
                value={formTaskPriority}
            >
                <option value="" disabled>Select a default task priority</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </Form.Select>
        </Form.Group>
    )
}

export default DefaultTaskPriority;