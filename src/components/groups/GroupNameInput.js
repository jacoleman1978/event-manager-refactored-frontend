import React from "react";
import { Form } from "react-bootstrap";

// Called from EditGroup.js
const GroupNameInput = ({groupName, setGroupName}) => {
    return (
        <Form.Group controlId="formGroupName" className="flex-left-center">
            <Form.Label className="flex-left-bold">Group Name:</Form.Label>
            <Form.Control 
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
                className="input-width"
            />
        </Form.Group>
    )
}

export default GroupNameInput;