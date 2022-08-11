import React from "react";
import { Form } from "react-bootstrap";

const Notes = (props) => {
    let {formNotes, setNotes} = props;

    return (
        <Form.Group controlId="formNotes" className="flex-left-center-wrap">
            <Form.Label className="form-label">Notes: </Form.Label>
            <Form.Control 
                as="textarea" 
                rows={5} 
                className="input-width"
                defaultValue={formNotes}
                onChange={(e) => setNotes(e.target.value)}
            />
        </Form.Group>
    )
}

export default Notes;