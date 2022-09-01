import React from "react";
import { Nav } from "react-bootstrap";

// Called from NavMenu.js
const ViewBtns = ({isTask, isEvent}) => {
    const btnDisplay = (isTask, isEvent) => {
        if (isTask) {
            return (
                <>
                    <Nav.Link href='/tasks/priority'>By Priority</Nav.Link>
                    <Nav.Link href='/tasks/duedate'>By Due Date</Nav.Link>
                    <Nav.Link href='/tasks/new'>New Task</Nav.Link>
                </>
            )
        } else if (isEvent) {
            return (
                <>
                    <Nav.Link href='/events/week/0'>By Week</Nav.Link>
                    <Nav.Link href='/events/day/0'>By Day</Nav.Link>
                    <Nav.Link href='/events/new'>New Event</Nav.Link>
                </>
            )
        } 
    }

    return (
        <>
            {btnDisplay(isTask, isEvent)}
        </>
    )
}

export default ViewBtns;