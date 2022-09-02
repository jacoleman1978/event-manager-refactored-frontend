import React, { useContext } from "react";
import { Card } from "react-bootstrap"
import getDisplayDateFormated from "../../helpers/getDisplayDateFormated";
import DisplayButtonGroup from "./DisplayButtonGroup";
import { CurrentUser } from '../../contexts/currentUser';
import CardTitleWithValue from "../cards/CardTitleWithValue";
import CardTitleWithList from "../cards/CardTitleWIthList";
import CardTitleWithValueNextLine from "../cards/CardTitleWithValueNextLine";

// Called from TaskRow.js
const DetailedView = ({event, type, isWeek}) => {  
    const { currentUser } = useContext(CurrentUser);

    // Format the start and end dates for display
    let startDate = getDisplayDateFormated(event.allDay.startDate);
    let endDate = getDisplayDateFormated(event.allDay.endDate);

    // Generate list items for display of group names
    let groupList = event.groupIds.map((group) => {
        return (
            <li key={group._id}>
                {group.name}
            </li>
        )
    })

    // Get full name of event owner
    let ownerName = (event) => {
        return (
            <li key={event.ownerId} className="remove-bullet-pt">
                {`${event.ownerId.firstName} ${event.ownerId.lastName}`}
            </li>
            
        )
    }

    // Filter out the event owner from the event editorIds
    let editors = event.editorIds.filter((editor) => editor._id !== event.ownerId._id)

    // Generate list items for display of event editor names
    let editorList = editors.map((editor) => {
        return (
            <li key={editor._id}>
                {`${editor.firstName} ${editor.lastName}`}
            </li>
        )
    })

    // Generate list items for display of event viewer names
    let viewerList = event.viewerIds.map((viewer) => {
        return (
            <li key={viewer._id}>
                {`${viewer.firstName} ${viewer.lastName}`}
            </li>
        )
    })

    // Determine if the current user is listed as the owner or an editor of the event
    // Used to determine whether complete, edit and delete buttons are shown for the event
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
        <div className="flex-left-center-wrap" key={`${event._id}-detailed`} style={isWeek ? {width: "13rem"} : {}}>
            <Card key={event._id} className="card-style" >
                <Card.Title className="title">{event.title}</Card.Title>
                    <hr />
                <div className="sm-bottom-padding">
                    <div className="card-container">
                        <div>
                            {type === "task" ? <CardTitleWithValue title={"Priority"} value={event.task.priority} /> : ""}

                            <CardTitleWithValueNextLine title={"Start Date"} value={startDate} />

                            <CardTitleWithValueNextLine title={"End Date"} value={endDate} />

                            <CardTitleWithValue title={"Start Time"} value={event.allDay.startTime} />

                            <CardTitleWithValue title={"End Time"} value={event.allDay.endTime} />

                        </div>

                        <div>
                            <CardTitleWithList title={"Owner"} list={[ownerName(event)]} />

                            <CardTitleWithList title={"Editors"} list={editorList} />

                            <CardTitleWithList title={"Viewers"} list={viewerList} />

                        </div>

                        <div>
                            <CardTitleWithList title={"Groups"} list={groupList} />
                        </div>
                    </div>

                    <div className="card-container remove-bottom-margin">
                        <CardTitleWithValue title={"Notes"} value={event.notes} />
                    </div>
                    
                </div>
                {isEventEditor() ? <DisplayButtonGroup event={event} type={type} /> : ""}
            </Card>
        </div>
    )
}

export default DetailedView