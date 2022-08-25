import React from "react";
import { Form } from "react-bootstrap";

// Called from ChangePassword.js
const PasswordInput = ({label, setPassword}) => {
    return (
        <Form.Group controlId={label} className="flex-left-center">
            <Form.Label>{label} Password:</Form.Label>
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