import React from "react";
import { Card } from "react-bootstrap";
import CardTitleWithValue from "../cards/CardTitleWithValue";

const DetailedCompletedTaskView = ({task}) => {
    let date = new Date(task.task.dateCompleted);
    let formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

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
        </Card>
    )
}

export default DetailedCompletedTaskView;