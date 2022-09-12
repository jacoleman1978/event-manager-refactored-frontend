import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CardTitleWithValue from "../eventViews/CardTitleWithValue";

// Called by /tasks/CompletedTaskRow.js
const DetailedCompletedTaskView = ({task}) => {
    const navigate = useNavigate();

    // Formats current date as 'MM/DD/YYYY'
    let date = new Date(task.task.dateCompleted);
    let formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    // When button is clicked, go to the edit view of the task
    const restoreTask = () => {
        navigate(`/tasks/edit/${task._id}/restore`);
    }

    return (
        <Card key={task._id} className="week-wrapper">
            <Card.Title className="title">{task.title}</Card.Title>
            <hr />
            <div className="sm-bottom-padding">
                <div className="card-container remove-bottom-margin">
                    <CardTitleWithValue title={"Date Completed"} value={formattedDate} />
                </div>
                <div className="card-container remove-bottom-margin">
                    <CardTitleWithValue title={"Notes"} value={task.notes} />
                </div>
            </div>
            <Button
                variant="warning"
                onClick={restoreTask}
            >
                Restore Task
            </Button>
        </Card>
    )
}

export default DetailedCompletedTaskView;