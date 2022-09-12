import React, { useState } from "react";
import {Form, Button} from 'react-bootstrap';
import EventDataService from "../../services/eventDataService";
import Title from "../form/Title";
import Priority from "../form/Priority";
import EndDate from "../form/EndDate";
import Notes from "../form/Notes";
import getDefaultDate from "../../helpers/getDefaultDate";

// Called from TasksByPriority.js and TasksByDueDate.js
// Creates a new task with only minimal fields inputted by user
const NewSimpleTask = ({settings}) => {
    let [formTitle, setTitle] = useState("");
    let [formPriority, setPriority] = useState(settings.task.priority);
    let [formEndDate, setEndDate] = useState(getDefaultDate(settings.allDay.endDate));
    let [formNotes, setNotes] = useState("");

    // Uses the DataService to port the data to database when form submitted
    const handleSubmit = (e) => {
        let data = {
            title: formTitle, 
            task: {
                isIt: true,
                priority: formPriority,
                taskCompleted: false
            },
            allDay: {
                isIt: true,
                startDate: getDefaultDate(settings.allDay.startDate),
                endDate: formEndDate
            },
            recurring: {
                isIt: false
            },
            notes: formNotes
        };
        
        EventDataService.AddEvent(data);
    }

    // Form to add a new Task displayed on the Sorted pages. Only required fields present.
    return (
        <div>
            <p className="title">New Simple Task</p>
            <Form className="outline small-top-margin" onSubmit={handleSubmit}>
                <Form.Group className="week-wrapper">
                    <Title formTitle={formTitle} setTitle={setTitle} label={"Task Title: "}/>
            
                    <Priority formPriority={formPriority} setPriority={setPriority} label={"Priority: "} />

                    <EndDate formEndDate={formEndDate} setEndDate={setEndDate} label={"End Date: "} />
                </Form.Group>
                

                <Form.Group className="week-wrapper">
                    <Notes formNotes={formNotes} setNotes={setNotes} />
                </Form.Group>
                
            
                <Button variant="primary" type="submit" className="align-self bottom-margin">
                    Create New Simple Task
                </Button>
            
            </Form>
        </div>

    )
}

export default NewSimpleTask