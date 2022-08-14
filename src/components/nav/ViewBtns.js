import React from "react";
import { Nav } from "react-bootstrap";

const ViewBtns = (props) => {
    // Props
    const { isTask, isEvent} = props;

    const btnDisplay = (isTask, isEvent) => {
        if (isTask === true) {
            return (
                <>
                    <Nav.Link href='/tasks/priority'>By Priority</Nav.Link>
                    <Nav.Link href='/tasks/duedate'>By Due Date</Nav.Link>
                    <Nav.Link href='/tasks/new'>New Task</Nav.Link>
                </>
            )
        } else if (isEvent === true) {
            return (
                <>
                    <Nav.Link href='/events/list/0'>By List</Nav.Link>
                    <Nav.Link href='/events/overview/0'>By Overview</Nav.Link>
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