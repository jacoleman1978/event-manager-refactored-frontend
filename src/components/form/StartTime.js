import React from "react";
import { Form } from "react-bootstrap";

const StartTime = (props) => {
    let {formStartTime, setStartTime, label} = props;

    return (
        <div className="flex-left-center-no-gap">
            <Form.Label className="remove-bottom-margin">{label}</Form.Label>
            <Form.Control 
                type="time" 
                required 
                className="dropdown-width"
                defaultValue={formStartTime}
                onChange={(e) => setStartTime(e.target.value)}
            />
        </div>
    )
}

export default StartTime;