import React from "react";
import { Form } from "react-bootstrap";

// Called from ViewSettings.js
const DefaultLoginSelector = ({setLoginView, formLoginView}) => {
    return (
        <Form.Group className="flex-between-center" controlId="formLoginView">
            <Form.Label className="flex-left-bold">Default Login: </Form.Label>
            <Form.Select 
                className="dropdown-width" 
                aria-label="Select a default login view" 
                required 
                onChange={(e) => setLoginView(e.target.value)}
                value={formLoginView}
            >
                <option value="" disabled>Select a default view</option>
                <option value="Events">Events</option>
                <option value="Tasks">Tasks</option>
                <option value="Groups">Groups</option>
                <option value="Settings">Settings</option>
            </Form.Select>
        </Form.Group>
    )
}

export default DefaultLoginSelector;