import React, { useContext } from "react";
import { Card } from "react-bootstrap"
import getDisplayDateFormated from "../../helpers/getDisplayDateFormated";
import DisplayButtonGroup from "./DisplayButtonGroup";
import { CurrentUser } from '../../contexts/currentUser';
import CardTitleWithValue from "../cards/CardTitleWithValue";
import CardTitleWithList from "../cards/CardTitleWIthList";

const DetailedView = (props) => {  
    let {event, type, isWeek} = props;

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

    let editors = event.editorIds.filter((editor) => editor._id !== event.ownerId._id)

    let editorList = editors.map((editor) => {
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

    let cardStyle = {};

    if (isWeek === true) {
        cardStyle["width"] = "13rem";
    }

    return (
        <div className="flex-left-center-wrap" key={`${event._id}-detailed`} style={cardStyle}>
            <Card key={event._id} className="card-style" >
                <Card.Title className="title">{event.title}</Card.Title>
                    <hr />
                <Card.Body className="card-container">
                    <div>
                        {type === "task" ? <CardTitleWithValue title={"Priority"} value={event.task.priority} /> : ""}

                        <CardTitleWithValue title={"Start Date"} value={startDate} />
                        
                        <CardTitleWithValue title={"End Date"} value={endDate} />

                        <CardTitleWithValue title={"Start Time"} value={event.allDay.startTime} />

                        <CardTitleWithValue title={"End Time"} value={event.allDay.endTime} />

                        <CardTitleWithValue title={"Notes"} value={event.notes} />

                    </div>

                    <div className="flex-col-center-left-no-gap">
                        <CardTitleWithValue title={"Owner"} value={ownerName(event)} />

                        <CardTitleWithList title={"Editors"} list={editorList} />

                        <CardTitleWithList title={"Viewers"} list={viewerList} />

                    </div>

                    <div>
                        <CardTitleWithList title={"Groups"} list={groupList} />
                    </div>

                </Card.Body>
                {isEventEditor() ? <DisplayButtonGroup event={event} type={type} /> : ""}
            </Card>
        </div>
    )
}

export default DetailedView