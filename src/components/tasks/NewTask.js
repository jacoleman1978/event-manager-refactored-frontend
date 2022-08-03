import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { CurrentUser } from "../../contexts/currentUser";
import EventDataService from "../../services/eventDataService";
import SettingsDataService from "../../services/settingsDataService";

const NewTask = () => {
    // Get currentUser from context
    const { currentUser } = useContext(CurrentUser);

    // State for user settings
    let [settings, setSettings] = useState(null);

    // Use state to keep track of info entered into the form
    let [formTitle, setTitle] = useState("");
    let [formPriority, setPriority] = useState("Low");
    let [formDueDate, setDueDate] = useState("");
    let [formNotes, setNotes] = useState("");

    let settingsId = null;

    useEffect(() => {
        if (currentUser !== "undefined" && currentUser !== null) {
            settingsId = currentUser.settingsId;
    
            SettingsDataService.GetSettings(settingsId).then(res => setSettings(res.data.settings));
        }
    }, [currentUser])

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
    return (
        <Form onSubmit={handleSubmit}>
            <Row>
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
            <Row>
                <Col xs="auto">
                    <Form.Group className="mb-3" controlId="formPriority">
                        <Form.Select aria-label="Select a priority" required onChange={(e) => setPriority(e.target.value)}>
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
                <Row>
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

export default NewTask;