import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";
import { CurrentUser } from '../../contexts/currentUser';
import EventDataService from "../../services/eventDataService";
import GroupDataService from "../../services/groupDataService";

const EventRow = (props) => {
    const navigate = useNavigate();

    // Get currentUser from context
    const { currentUser } = useContext(CurrentUser);

    // Props
    const {event} = props;

    // Set state for which view to display. view State changed by clicking on a list item.
    let [view, setView] = useState(true)

    // This is the default view and only displays the event
    const simpleView = () => {
        // Style for each row
        const rowStyle = {
            display: "flex",
            marginTop: "5px",
        }

        return (
            <div key={event._id} style={rowStyle} >
                {event.title}
            </div>
        )
    }

    // The detailed view is displayed when the event list item is clicked.
    const detailedView = () => {
        let isEventEditor = false;
        let eventEditors = [event.ownerId];

        for (let editorId of event.editorIds) {
            eventEditors = [...eventEditors, editorId._id]
        }
        
        for (let editor of eventEditors) {
            if (editor !== 'undefined') {
                if (editor === currentUser.userId) {
                    isEventEditor = true;
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

        let deconstructedDate = event.allDay.endDate.split("-");

        if (deconstructedDate.length === 3) {
            dueDate = `${deconstructedDate[1]}/${deconstructedDate[2]}/${deconstructedDate[0]}`
        } else {
            return simpleView()
        }

        let groupData = []

        event.groupIds.forEach((groupId) => {
            GroupDataService.GetGroupById(groupId).then(res => {
                groupData.push([groupId, res.data.groupDoc.name]);
            })
        })
        console.log(groupData)

        let groupList = groupData.map((data) => {
            console.log(data)
            return (
                <li key={data[0]}>
                    {data[1]}
                </li>
            )
        })

        console.log(groupList)

        const completeEvent = (e) => {
            e.preventDefault();
            EventDataService.DeleteEvent(event._id);
        }

        const editEvent = (e) => {
            navigate(`/event/edit/${event._id}`);
        }

        const deleteEvent = (e) => {
            e.preventDefault();
            EventDataService.DeleteEvent(event._id);
        }

        const displayButtonGroup = () => {
            return (
                <div className={"flex-center-wrap"}>
                    <Button
                        variant="success"
                        onClick={completeEvent}
                    >
                        <i className="fa-regular fa-circle-check"></i>
                    </Button>

                    <Button
                        variant="warning"
                        onClick={editEvent}
                    >
                        <i className="far fa-edit"></i>
                    </Button>

                    <Button
                        variant="danger"
                        onClick={deleteEvent}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </div>
            )
        }

        return (
            <div className="flex-left-center-wrap">
                <Card key={event._id} style={rowStyle} >
                    <Card.Body className="new-doc-container">
                        <Card.Title className="title">{event.title}</Card.Title>
                        <hr />
                        <Card.Text>
                            <strong>Due Date</strong>: {dueDate}
                        </Card.Text>
                        <Card.Text>
                            <strong>Groups</strong>: {groupList.length === 0 ? "None" : ""}
                        </Card.Text>

                        {groupList.length > 0 ? <ul> {groupList} </ul>: ""}

                        <Card.Text>
                            <strong>Notes</strong>: {event.notes}
                        </Card.Text>
                    </Card.Body>
                    {isEventEditor === true ? displayButtonGroup() : ""}
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

export default EventRow;