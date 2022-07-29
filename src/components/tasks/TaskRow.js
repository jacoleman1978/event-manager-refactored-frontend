import React, { useState } from "react";
import { Card } from "react-bootstrap";

const TaskRow = (props) => {
    // Props
    const {task} = props;

    // Set state for which view to display. view State changed by clicking on a list item.
    let [view, setView] = useState(true)

    // This is the default view and only displays the task
    const simpleView = () => {
        // Style for each row
        const rowStyle = {
            display: "flex",
            marginTop: "5px",
        }

        return (
            <div key={task._id + task.task.priority} style={rowStyle} >
                {task.title}
            </div>
        )
    }

    // The detailed view is displayed when the task list item is clicked.
    const detailedView = () => {
        // If there is no task for the TaskGroup, display 'No tasks found'

        // Style to use when detailed view is active
        const detailedRowDisplay = {
            display: "flex",
            justifyContent: "center",
        }

        // Style for each row
        const rowStyle = {
            display: "flex",
            marginTop: "5px",
            backgroundColor: "antiquewhite"
        }

        return (
            <div style={detailedRowDisplay}>
                <Card key={task._id + task.task.priority} style={rowStyle} >
                    <Card.Body>
                        <Card.Title><strong>{task.title}</strong></Card.Title>
                        <hr />
                        <Card.Text>
                            <strong>Priority</strong>: {task.task.priority}
                        </Card.Text>
                        <Card.Text>
                            <strong>Due Date</strong>: {task.allDay.endDate}
                        </Card.Text>
                        <Card.Text>
                            <strong>Notes</strong>: {task.notes}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            
        )
    }

    // How the task info is displayed to the user depends on the state of view.
    return (
        <div onClick={() => {setView(!view)}}>
            {view ? simpleView(): detailedView()}
        </div>
    )
}

export default TaskRow;