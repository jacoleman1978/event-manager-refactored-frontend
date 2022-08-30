import React from "react";
import { Form } from "react-bootstrap";

const TextInputWrapper = ({label, defaultValue, setStateValue}) => {
    return (
        <div className="flex-left-center-no-gap">
            <Form.Label className="flex-left-bold">{label}:</Form.Label>
            <Form.Control 
                type="text"
                defaultValue={defaultValue}
                onChange={(e) => setStateValue(e.target.value)}
                className="input-width"
            />
        </div>
    )
}

export default TextInputWrapper;