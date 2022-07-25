import React from "react";
import { Card } from "react-bootstrap";

const GroupInvitations = (props) => {
    // Get props
    const {group} = props;

    let owner = `${group.ownerId.firstName} ${group.ownerId.lastName}`;

    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title><strong>{group.name}</strong></Card.Title>
                    <hr />
                    <Card.Text>Owner:</Card.Text>
                        {owner}
                </Card.Body>
            </Card>
        </div>
    )
}

export default GroupInvitations;