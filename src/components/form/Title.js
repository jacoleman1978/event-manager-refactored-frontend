import React from "react";
import {Form} from "react-bootstrap";

// Called by events/EventForm.js
const Title = ({formTitle, setTitle, label}) => {
    // Displays and maintains state for an event/task title
    return (
        <div className="flex-left-center-no-gap outline-inner">
            <Form.Label className="flex-left-bold">{label}</Form.Label>
            <Form.Control
                className="input-width"
                required
                type="text"
                defaultValue={formTitle}
                aria-describedby={label}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
    )
}

export default Title;