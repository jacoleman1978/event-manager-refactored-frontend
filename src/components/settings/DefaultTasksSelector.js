import React from "react";
import { Form } from "react-bootstrap"

// Called from ViewSettings.js
const DefaultTasksSelector = ({setTasksView, formTasksView}) => {
    return (
        <Form.Group className="flex-between-center" controlId="formTasksView">
            <Form.Label className="flex-left-bold">Default Tasks: </Form.Label>
            <Form.Select 
                className="dropdown-width" 
                aria-label="Select a default task view" 
                required 
                onChange={(e) => setTasksView(e.target.value)}
                value={formTasksView}
            >
                <option value="" disabled>Select a default view</option>
                <option value="By Priority">By Priority</option>
                <option value="By Due Date">By Due Date</option>
            </Form.Select>
        </Form.Group>
    )
}

export default DefaultTasksSelector;