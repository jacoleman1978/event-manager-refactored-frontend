import React from "react";
import { Form } from "react-bootstrap";

// Called from ChangePassword.js
// A wrapper for a password input field, using a passed in label and maintaining state
const PasswordInput = ({label, setPassword}) => {
    return (
        <Form.Group controlId={label} className="flex-col-center-left">
            <Form.Label className="flex-left-bold" >{label} Password:</Form.Label>
            <Form.Control
                required
                className="input-width"
                type="password"
                aria-describedby={`Enter ${label.toLowerCase()} password`}
                placeholder={`Enter ${label.toLowerCase()} password`}
                onChange={(e) => setPassword(e.target.value)}
            />
        </Form.Group>
    )
}

export default PasswordInput;