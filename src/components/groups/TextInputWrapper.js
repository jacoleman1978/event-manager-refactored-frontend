import React from "react";
import { Form } from "react-bootstrap";

// Called by /groups/EditGroup.js, /groups/NewGroupForm.js, /groups/UserSearch.js
const TextInputWrapper = ({label, defaultValue, setStateValue}) => {
    // Displays and maintains state for an input field with the passed in label
    return (
        <div className="flex-left-center-no-gap">
            <Form.Label className="flex-left-bold">{label}:</Form.Label>
            <Form.Control 
                type="text"
                defaultValue={defaultValue}
                onChange={(e) => setStateValue(e.target.value)}
            />
        </div>
    )
}

export default TextInputWrapper;