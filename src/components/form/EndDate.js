import React from "react";
import { Form } from "react-bootstrap";

const EndDate = (props) => {
    let {formEndDate, setEndDate, label} = props;

    return (
        <div className="flex-left-center-no-gap">
            <Form.Label className="form-label">{label}</Form.Label>
            <Form.Control 
                type="date" 
                required 
                className="dropdown-width"
                defaultValue={formEndDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
        </div>
    )
}

export default EndDate;