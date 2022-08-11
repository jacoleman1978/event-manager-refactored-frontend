import React from "react";
import { Form } from "react-bootstrap";

const Priority = (props) => {
    let {formPriority, setPriority, label} = props;

    return (
        <div className="flex-left-center-no-gap">
            <Form.Label>{label}</Form.Label>
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