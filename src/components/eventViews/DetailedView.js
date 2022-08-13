import React, { useContext } from "react";
import { Card } from "react-bootstrap"
import getDisplayDateFormated from "../../helpers/getDisplayDateFormated";
import DisplayButtonGroup from "./DisplayButtonGroup";
import { CurrentUser } from '../../contexts/currentUser';

const DetailedView = (props) => {  
    let {event, type} = props;

    const { currentUser } = useContext(CurrentUser);

    // Format the start and end dates for display
    let startDate = getDisplayDateFormated(event.allDay.startDate);
    let endDate = getDisplayDateFormated(event.allDay.endDate);

    let groupList = event.groupIds.map((group) => {
        return (
            <li key={group._id}>
                {group.name}
            </li>
        )
    })

    let ownerName = (event) => {
        return (
            `${event.ownerId.firstName} ${event.ownerId.lastName}`
        )
    }

    let editorList = event.editorIds.map((editor) => {
        return (
            <li key={editor._id}>
                {`${editor.firstName} ${editor.lastName}`}
            </li>
        )
    })

    let viewerList = event.viewerIds.map((viewer) => {
        return (
            <li key={viewer._id}>
                {`${viewer.firstName} ${viewer.lastName}`}
            </li>
        )
    })

    // Determine if the current user is listed as the owner or an editor of the event
    const isEventEditor = () => {
        let eventEditors = [event.ownerId._id];

        for (let editorId of event.editorIds) {
            eventEditors = [...eventEditors, editorId._id]
        }
        
        for (let editor of eventEditors) {
            if (editor !== 'undefined') {
                if (editor === currentUser.userId) {
                    return true
                }
            }
        }

        return false
    }

    return (
        <div className="flex-left-center-wrap" key={`${event._id}-detailed`}>
            <Card key={event._id} className="card-style" >
                <Card.Title className="title">{event.title}</Card.Title>
                    <hr />
                <Card.Body className="card-container">
                    <div>
                        {type === "task" ? <Card.Text className="flex-left-center-no-gap"><strong>Priority</strong>: {event.task.priority}</Card.Text> : ""}

                        <Card.Text className="flex-left-center-no-gap">
                            <strong>Start Date</strong>: {startDate}
                        </Card.Text>

                        <Card.Text className="flex-left-center-no-gap">
                            <strong>End Date</strong>: {endDate}
                        </Card.Text>

                        <Card.Text className="flex-left-center-no-gap">
                            <strong>Start Time</strong>: {event.allDay.startTime}
                        </Card.Text>

                        <Card.Text className="flex-left-center-no-gap">
                            <strong>End Time</strong>: {event.allDay.endTime}
                        </Card.Text>

                        <Card.Text className="flex-left-center-no-gap">
                            <strong>Notes</strong>: {event.notes}
                        </Card.Text>
                    </div>

                    <div className="flex-col-center-left">
                        <Card.Text>
                            <strong>Owner</strong>: {ownerName(event)}
                        </Card.Text>

                        <div>
                            <Card.Text className="flex-left-center-no-gap">
                                <strong>Editors</strong>: {editorList.length === 0 ? "None" : ""}
                            </Card.Text>

                            {editorList.length > 0 ? <ul> {editorList} </ul>: ""}
                        </div>

                        <div>
                            <Card.Text className="flex-left-center-no-gap">
                                <strong>Viewers</strong>: {viewerList.length === 0 ? "None" : ""}
                            </Card.Text>

                            {viewerList.length > 0 ? <ul> {viewerList} </ul>: ""}
                        </div>
                    </div>

                    <div>
                        <Card.Text className="flex-left-center-no-gap">
                            <strong>Groups</strong>: {groupList.length === 0 ? "None" : ""}
                        </Card.Text>

                        {groupList.length > 0 ? <ul> {groupList} </ul>: ""}
                    </div>

                </Card.Body>
                {isEventEditor() ? <DisplayButtonGroup event={event} type={type} /> : ""}
            </Card>
        </div>
    )
}

export default DetailedView