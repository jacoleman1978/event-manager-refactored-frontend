import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import SettingsDataService from "../../services/settingsDataService";

const ViewSettings = (props) => {
    const { settings, setSettings } = props;

    // Use state to keep track of info entered into the form

    let [formEventsView, setEventsView] = useState("");
    let [formTasksView, setTasksView] = useState("");
    let [formLoginView, setLoginView] = useState("");
    let [formStartWeek, setStartWeek] = useState("")

    useEffect(() => {
        if (settings !== "undefined" && settings !== null) {
            setEventsView(settings.views.events);
            setTasksView(settings.views.tasks);
            setLoginView(settings.views.login);
            setStartWeek(settings.views.startOfWeek);
        }
    }, [settings])

    // Uses the DataService to port the data to database when form submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            views: {
                events: formEventsView,
                tasks: formTasksView,
                login: formLoginView,
                startOfWeek: formStartWeek
            }
        }
        
        SettingsDataService.UpdateSettings(data).then(res => setSettings(res.data.settings));
    }
    return (
        <div className="group-container">
            <p className="flex-left-bold">View Defaults:</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="flex-left-center" controlId="formEventsView">
                    <Form.Label>Default Events: </Form.Label>
                    <Form.Select 
                        className="dropdown-width" 
                        aria-label="Select a default event view" 
                        required 
                        onChange={(e) => setEventsView(e.target.value)}
                        value={formEventsView}
                    >
                        <option value="" disabled>Select a default view</option>
                        <option value="By Day">By Day</option>
                        <option value="By List">By List</option>
                        <option value="By Overview">By Overview</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="flex-left-center" controlId="formTasksView">
                    <Form.Label>Default Tasks: </Form.Label>
                    <Form.Select 
                        className="dropdown-width" 
                        aria-label="Select a default task view" 
                        required 
                        onChange={(e) => setTasksView(e.target.value)}
                        value={formTasksView}
                    >
                        <option value="" disabled>Select a default view</option>
                        <option value="By Priority">By Priority</option>
                        <option value="By Due Date">By Due Date</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="flex-left-center" controlId="formLoginView">
                    <Form.Label>Default Login: </Form.Label>
                    <Form.Select 
                        className="dropdown-width" 
                        aria-label="Select a default login view" 
                        required 
                        onChange={(e) => setLoginView(e.target.value)}
                        value={formLoginView}
                    >
                        <option value="" disabled>Select a default view</option>
                        <option value="Events">Events</option>
                        <option value="Tasks">Tasks</option>
                        <option value="Groups">Groups</option>
                        <option value="Settings">Settings</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="flex-left-center" controlId="formStartWeek">
                    <Form.Label>Week Starts On: </Form.Label>
                    <Form.Select 
                        className="dropdown-width" 
                        aria-label="Select a default start of week" 
                        required 
                        onChange={(e) => setLoginView(e.target.value)}
                        value={formStartWeek}
                    >
                        <option value="" disabled>Select a default day</option>
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save View Defaults
                </Button>

            </Form>
        </div>
    )
}

export default ViewSettings;