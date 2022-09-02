import React from "react";
import {Form} from "react-bootstrap";

const Title = (props) => {
    let {formTitle, setTitle, label} = props;

    return (
        <div className="flex-left-center-no-gap outline-inner">
            <Form.Label className="remove-bottom-margin">{label}</Form.Label>
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