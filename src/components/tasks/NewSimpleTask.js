import React, { useState } from "react";
import {Form, Button, Row, Col} from 'react-bootstrap';
import EventDataService from "../../services/eventDataService";

const NewSimpleTask = (props) => {
    // Get props
    let {settings} = props;

    // Use state to keep track of info entered into the form
    let [formTitle, setTitle] = useState("");
    let [formPriority, setPriority] = useState(settings.task.priority);
    let [formDueDate, setDueDate] = useState("");
    let [formNotes, setNotes] = useState("");

    // Uses the DataService to port the data to database when form submitted
    const handleSubmit = (e) => {
        let data = {
            title: formTitle, 
            task: {
                isIt: true,
                priority: formPriority
            },
            allDay: {
                isIt: true,
                startDate: new Date(),
                endDate: formDueDate
            },
            recurring: {
                isIt: false
            },
            notes: formNotes
        };
        
        EventDataService.AddEvent(data);
    }

    // Style for entire Form
    const formStyle = {
        border: "black 1px solid",
        borderRadius: "2rem",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    }

    // Style for Row 1 of the Form
    const row1Style = {
        marginTop: "1rem",
        marginLeft: "auto",
        marginRight: "auto",
        width: "99%"
    }

    // Style for Row 2 of the Form
    const row2Style = {
        display: "flex",
        justifyContent: "center"
    }

    // Form to add a new Task displayed on the Sorted pages. Only required fields present.
    return (
        <Form style={formStyle} onSubmit={handleSubmit}>
            <Row style={row1Style}>
                <Form.Group className="mb-3" controlId="formTask">
                    <Form.Control
                        required
                        type="text"
                        aria-describedby="Enter task title"
                        placeholder="Enter task title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
            </Row>
            <Row style={row2Style}>
                <Col xs="auto">
                    <Form.Group className="mb-3" controlId="formPriority" >
                        <Form.Select 
                            aria-label="Select a priority" 
                            required 
                            defaultValue={formPriority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="" disabled>Select a priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs="auto">
                    <Form.Group controlId="formDueDate">
                        <Form.Control 
                            type="date" 
                            required onChange={(e) => setDueDate(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Row style={row2Style}>
                <Form.Group className="mb-3" controlId="formNotes">
                    <Form.Control 
                        as="textarea" 
                        rows={5} 
                        aria-describedby="Enter more details about task"
                        placeholder="(Optional) Enter details about the task" 
                        onChange={(e) => setNotes(e.target.value)}
                        value={formNotes}
                    />
                </Form.Group>
            </Row>
                <Col xs="auto">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default NewSimpleTask