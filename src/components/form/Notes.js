import React from "react";
import { Form } from "react-bootstrap";

// Called by /events/EventForm.js, /tasks/NewSimpleTask.js, /tasks/TaskForm.js
const Notes = ({formNotes, setNotes}) => {
    // Displays and maintains state for notes
    return (
        <Form.Group controlId="formNotes" className="flex-left-center-wrap small-gap">
            <Form.Label className="flex-left-bold">Notes: </Form.Label>
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