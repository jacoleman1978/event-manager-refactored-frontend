import React from "react";
import { Form } from "react-bootstrap";

const EndTime = (props) => {
    let {formEndTime, setEndTime, label} = props;

    return (
        <div className="flex-left-center-no-gap">
            <Form.Label className="flex-left-bold">{label}</Form.Label>
            <Form.Control 
                type="time" 
                required 
                className="dropdown-width"
                defaultValue={formEndTime}
                onChange={(e) => setEndTime(e.target.value)}
            />
        </div>
    )
}

export default EndTime;