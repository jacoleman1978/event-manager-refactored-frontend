import React from "react";
import { Form } from "react-bootstrap";

// Called by /tasks/NewSimpleTask.js, /tasks/TaskForm.js
const Priority = ({formPriority, setPriority, label}) => {
    // Displays a dropdown list of priorities and maintains state
    return (
        <div className="flex-left-center-no-gap outline-inner">
            <Form.Label className="flex-left-bold">{label}</Form.Label>
            <Form.Select 
                aria-label={label}
                required 
                className="dropdown-width"
                value={formPriority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="" disabled>Select a priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
            </Form.Select>
        </div>
    )
}

export default Priority;