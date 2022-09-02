import React from "react";
import { Form } from "react-bootstrap";

const Notes = (props) => {
    let {formNotes, setNotes} = props;

    return (
        <Form.Group controlId="formNotes" className="flex-left-center-wrap small-gap">
            <Form.Label className="remove-bottom-margin">Notes: </Form.Label>
            <Form.Control 
                as="textarea" 
                rows={5} 
                defaultValue={formNotes}
                className="small-right-left-margins"
                onChange={(e) => setNotes(e.target.value)}
            />
        </Form.Group>
    )
}

export default Notes;