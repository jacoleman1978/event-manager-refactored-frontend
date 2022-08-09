import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";
import { CurrentUser } from '../../contexts/currentUser';
import EventDataService from "../../services/eventDataService";

const TaskRow = (props) => {
    const navigate = useNavigate();

    // Get currentUser from context
    const { currentUser } = useContext(CurrentUser);

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
        let isTaskEditor = false;
        let taskEditors = [task.ownerId];

        for (let editorId of task.editorIds) {
            taskEditors = [...taskEditors, editorId._id]
        }
        
        for (let editor of taskEditors) {
            if (editor !== 'undefined') {
                if (editor === currentUser.userId) {
                    isTaskEditor = true;
                    break;
                }
            }
        }

        // Style for each row
        const rowStyle = {
            display: "flex",
            marginTop: "5px",
            backgroundColor: "antiquewhite"
        }

        let dueDate = "";

        let deconstructedDate = task.allDay.endDate.split("-");

        if (deconstructedDate.length === 3) {
            dueDate = `${deconstructedDate[1]}/${deconstructedDate[2]}/${deconstructedDate[0]}`
        } else {
            return simpleView()
        }

        let groupList = task.groupIds.map((group) => {
            return (
                <li key={group._id}>
                    {group.name}
                </li>
            )
        })

        const completeTask = (e) => {
            e.preventDefault();
            EventDataService.DeleteEvent(task._id);
        }

        const editTask = (e) => {
            navigate(`/tasks/edit/${task._id}`);
        }

        const deleteTask = (e) => {
            e.preventDefault();
            EventDataService.DeleteEvent(task._id);
        }

        const displayButtonGroup = () => {
            return (
                <div className={"flex-center-wrap"}>
                    <Button
                        variant="success"
                        onClick={completeTask}
                    >
                        <i className="fa-regular fa-circle-check"></i>
                    </Button>

                    <Button
                        variant="warning"
                        onClick={editTask}
                    >
                        <i className="far fa-edit"></i>
                    </Button>

                    <Button
                        variant="danger"
                        onClick={deleteTask}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </div>
            )
        }

        return (
            <div className="flex-left-center-wrap">
                <Card key={task._id + task.task.priority} style={rowStyle} >
                    <Card.Body className="new-doc-container">
                        <Card.Title className="title">{task.title}</Card.Title>
                        <hr />
                        <Card.Text>
                            <strong>Priority</strong>: {task.task.priority}
                        </Card.Text>
                        <Card.Text>
                            <strong>Due Date</strong>: {dueDate}
                        </Card.Text>
                        <Card.Text>
                            <strong>Groups</strong>: {groupList.length === 0 ? "None" : ""}
                        </Card.Text>

                        {groupList.length > 0 ? <ul> {groupList} </ul>: ""}

                        <Card.Text>
                            <strong>Notes</strong>: {task.notes}
                        </Card.Text>
                    </Card.Body>
                    {isTaskEditor === true ? displayButtonGroup() : ""}
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