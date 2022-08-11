import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";
import { CurrentUser } from '../../contexts/currentUser';
import EventDataService from "../../services/eventDataService";

// Called from TaskGroup.js
const TaskRow = (props) => {
    const {task} = props;

    const navigate = useNavigate();

    const { currentUser } = useContext(CurrentUser);

    // Set state for which view to display
    let [isSimpleView, setView] = useState(true)

    // This is the default view and only displays the task title
    const simpleView = () => {
        return (
            <div key={task._id + task.task.priority}  >
                {task.title}
            </div>
        )
    }

    // The detailed view is displayed when the task list item is clicked.
    const detailedView = () => {
        // Format the due date for display
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

        let editorList = task.editorIds.map((editor) => {
            return (
                <li key={editor._id}>
                    {`${editor.firstName} ${editor.lastName}`}
                </li>
            )
        })

        let viewerList = task.viewerIds.map((viewer) => {
            return (
                <li key={viewer._id}>
                    {`${viewer.firstName} ${viewer.lastName}`}
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

        // Determine if the current user is listed as the owner or an editor of the task
        const isTaskEditor = () => {
            let taskEditors = [task.ownerId._id];

            for (let editorId of task.editorIds) {
                taskEditors = [...taskEditors, editorId._id]
            }
            
            for (let editor of taskEditors) {
                if (editor !== 'undefined') {
                    if (editor === currentUser.userId) {
                        return true
                    }
                }
            }

            return false
        }

        return (
            <div className="flex-left-center-wrap">
                <Card key={task._id + task.task.priority} className="card-style" >
                    <Card.Title className="title">{task.title}</Card.Title>
                        <hr />
                    <Card.Body className="card-container">
                        <div>
                            <Card.Text>
                                <strong>Priority</strong>: {task.task.priority}
                            </Card.Text>

                            <Card.Text>
                                <strong>Due Date</strong>: {dueDate}
                            </Card.Text>

                            <Card.Text>
                                <strong>Notes</strong>: {task.notes}
                            </Card.Text>
                        </div>

                        <div>
                            <div>
                                <Card.Text>
                                    <strong>Editors</strong>: {editorList.length === 0 ? "None" : ""}
                                </Card.Text>

                                {editorList.length > 0 ? <ul> {editorList} </ul>: ""}
                            </div>

                            <div>
                                <Card.Text>
                                    <strong>Viewers</strong>: {viewerList.length === 0 ? "None" : ""}
                                </Card.Text>

                                {viewerList.length > 0 ? <ul> {viewerList} </ul>: ""}
                            </div>
                        </div>

                        <div>
                            <Card.Text>
                                <strong>Groups</strong>: {groupList.length === 0 ? "None" : ""}
                            </Card.Text>

                            {groupList.length > 0 ? <ul> {groupList} </ul>: ""}
                        </div>

                    </Card.Body>
                    {isTaskEditor() ? displayButtonGroup() : ""}
                </Card>
            </div>
        )
    }

    // How the task info is displayed to the user depends on the state of view.
    return (
        <div onClick={() => {setView(!isSimpleView)}}>
            {isSimpleView ? simpleView(): detailedView()}
        </div>
    )
}

export default TaskRow;