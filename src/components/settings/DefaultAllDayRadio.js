import React from "react";
import { Form } from "react-bootstrap";

// Called from EventSettings.js
// Displays and maintains state using a switch to represent the allDay setting value
const DefaultAllDayRadio = ({setAllDay, formIsAllDay}) => {
    return (
        <Form.Group 
            className="flex-left-center" 
            controlId="formIsAllDay"
            
        >
            <Form.Label className="flex-left-bold">Default to all day: </Form.Label>
            <Form.Check 
                inline
                label="Yes"
                name="isAllDay"
                id="allDay"
                type="radio"
                onChange={(e) => setAllDay(true)}
                checked={formIsAllDay}
            />
            <Form.Check 
                inline
                label="No"
                id="useTime"
                name="isAllDay"
                type="radio"
                onChange={(e) => setAllDay(false)}
                checked={!formIsAllDay}
            />
        </Form.Group>
    )
}

export default DefaultAllDayRadio;