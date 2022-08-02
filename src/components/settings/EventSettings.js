import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import SettingsDataService from "../../services/settingsDataService";

const EventSettings = (props) => {
    const { settings } = props;

    // Use state to keep track of info entered into the form
    let [formIsAllDay, setAllDay] = useState(false);
    let [formStartDate, setStartDate] = useState("");
    let [formEndDate, setEndDate] = useState("");
    let [formStartTime, setStartTime] = useState("");
    let [formEndTime, setEndTime] = useState("");
    let [formTaskPriority, setPriority] = useState("");

    useEffect(() => {
        if (settings !== "undefined" && settings !== null) {
            setAllDay(settings.allDay.isIt);
            setStartDate(settings.allDay.startDate);
            setEndDate(settings.allDay.endDate);
            setStartTime(settings.allDay.startTime);
            setEndTime(settings.allDay.endTime);
            setPriority(settings.task.priority);
        }
    }, [settings])

    // Uses the DataService to port the data to database when form submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            task: {
                priority: formTaskPriority
            },
            allDay: {
                isIt: formIsAllDay,
                startDate: formStartDate,
                endDate: formEndDate,
                startTime: formStartTime,
                endTime: formEndTime
            }
        }
        
        SettingsDataService.UpdateSettings(data);
    }
    return (
        <div className="group-container">
            <p className="flex-left-bold">Event and Task Defaults:</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group 
                    className="flex-left-center" 
                    controlId="formIsAllDay"
                    onChange={(e) => setAllDay(e.target.label)}
                >
                    <Form.Label>Default to all day: </Form.Label>
                    <Form.Check 
                        inline
                        label="Yes"
                        name="isAllDay"
                        type="radio"
                        defaultChecked={formIsAllDay}
                    />
                     <Form.Check 
                        inline
                        label="No"
                        name="isAllDay"
                        type="radio"
                        defaultChecked={!formIsAllDay}
                    />
                </Form.Group>

                <Form.Group className="flex-left-center" controlId="formStartDate">
                    <Form.Label>Start Date: </Form.Label>
                    <Form.Select 
                        className="dropdown-width" 
                        aria-label="Select a default start date" 
                        required 
                        onChange={(e) => setStartDate(e.target.value)}
                        value={formStartDate}
                    >
                        <option value="" disabled>Select a default start date</option>
                        <option value="Today">Today</option>
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="Next Week">Next Week</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="flex-left-center" controlId="formEndDate">
                    <Form.Label>End Date: </Form.Label>
                    <Form.Select 
                        className="dropdown-width" 
                        aria-label="Select a default end date" 
                        required 
                        onChange={(e) => setEndDate(e.target.value)}
                        value={formEndDate}
                    >
                        <option value="" disabled>Select a default end date</option>
                        <option value="Today">Today</option>
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="Next Week">Next Week</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="flex-left-center" controlId="formStartTime">
                    <Form.Label>Start Time: </Form.Label>
                    <Form.Select 
                        className="dropdown-width" 
                        aria-label="Select a default start time" 
                        required 
                        onChange={(e) => setStartTime(e.target.value)}
                        value={formStartTime}
                    >
                        <option value="" disabled>Select a default start time</option>
                        <option value="Now">Now</option>
                        <option value="+15 Minutes">+15 Minutes</option>
                        <option value="+30 Minutes">+30 Minutes</option>
                        <option value="+45 Minutes">+45 Minutes</option>
                        <option value="+1 Hour">+1 Hour</option>
                        <option value="+2 Hours">+2 Hours</option>
                        <option value="+3 Hours">+3 Hours</option>
                        <option value="+4 Hours">+4 Hours</option>
                        <option value="+5 Hours">+5 Hours</option>
                        <option value="+6 Hours">+6 Hours</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="flex-left-center" controlId="formEndTime">
                    <Form.Label>End Time: </Form.Label>
                    <Form.Select 
                        className="dropdown-width" 
                        aria-label="Select a default end time" 
                        required 
                        onChange={(e) => setEndTime(e.target.value)}
                        value={formEndTime}
                    >
                        <option value="" disabled>Select a default end time</option>
                        <option value="+15 Minutes">+15 Minutes</option>
                        <option value="+30 Minutes">+30 Minutes</option>
                        <option value="+45 Minutes">+45 Minutes</option>
                        <option value="+1 Hour">+1 Hour</option>
                        <option value="+2 Hours">+2 Hours</option>
                        <option value="+3 Hours">+3 Hours</option>
                        <option value="+4 Hours">+4 Hours</option>
                        <option value="+5 Hours">+5 Hours</option>
                        <option value="+6 Hours">+6 Hours</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="flex-left-center" controlId="formTaskPriority">
                    <Form.Label>Task Priority: </Form.Label>
                    <Form.Select 
                        className="dropdown-width" 
                        aria-label="Select a default task priority" 
                        required 
                        onChange={(e) => setPriority(e.target.value)}
                        value={formTaskPriority}
                    >
                        <option value="" disabled>Select a default task priority</option>
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save Event Defaults
                </Button>

            </Form>
        </div>
    )
}

export default EventSettings;