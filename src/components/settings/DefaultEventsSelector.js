import React from "react";
import { Form } from "react-bootstrap"

// Called From ViewSettings.js
const DefaultEventsSelector = ({setEventsView, formEventsView}) => {
    return (
        <Form.Group className="flex-left-center" controlId="formEventsView">
            <Form.Label>Default Events: </Form.Label>
            <Form.Select 
                className="dropdown-width" 
                aria-label="Select a default event view" 
                required 
                onChange={(e) => setEventsView(e.target.value)}
                value={formEventsView}
            >
                <option value="" disabled>Select a default view</option>
                <option value="By Day">By Day</option>
                <option value="By List">By List</option>
                <option value="By Week">By Week</option>
            </Form.Select>
            </Form.Group> 
    )
}

export default DefaultEventsSelector;