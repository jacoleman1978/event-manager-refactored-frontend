import React from "react";
import { Card } from "react-bootstrap";


const GroupMembership = (props) => {
    // Get props
    const {group} = props;

    let owner = `${group.ownerId.firstName} ${group.ownerId.lastName}`;

    let editorMembers = group.editorIds.map((editorId, i) => {
        return (
            <li key={`editor-${i}`}>
                {`${editorId.firstName} ${editorId.lastName}`}
            </li>
        )
    })

    let viewerMembers = group.viewerIds.map((viewerId, i) => {
        return (
            <li key={`viewer-${i}`}>
                {`${viewerId.firstName} ${viewerId.lastName}`}
            </li>
        )
    })

    let invitees = group.inviteeIds.map((inviteeId, i) => {
        return (
            <li key={`invitee-${i}`}>
                {`${inviteeId.firstName} ${inviteeId.lastName}`}
            </li>
        )
    })

    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title><strong>{group.name}</strong></Card.Title>
                    <hr />
                    <Card.Text>Owner:</Card.Text>
                        {owner}
                    <Card.Text>Editor Members:</Card.Text>
                    <ul>
                        {editorMembers.length > 0 ? editorMembers : "None"} 
                    </ul>
                    <Card.Text>Viewer Members:</Card.Text>
                    <ul>
                        {viewerMembers.length > 0 ? viewerMembers : "None"}
                    </ul>
                    <Card.Text>People Invited to Join:</Card.Text>
                    <ul>
                        {invitees.length > 0 ? invitees : "None"}
                    </ul>
                </Card.Body>
            </Card>
        </div>
    )
}

export default GroupMembership;