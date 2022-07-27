import React from "react";
import { Button } from "react-bootstrap";
import GroupDataService from "../../services/groupDataService";

const GroupInvitations = (props) => {
    // Get props
    const {groupInvitations} = props;

    const handleAcceptInvite = (groupId) => {
        GroupDataService.AcceptGroupInvite(groupId);
    }

    const listStyle = {
        display: "flex",
        marginBottom: "0.5rem",
        gap: "0.3rem"
    }

    const buttonStyle = {
        marginRight: "0.5rem"
    }

    let invitationList = groupInvitations.map((group, i) => {
        let owner = `${group.ownerId.firstName} ${group.ownerId.lastName}`;

        return (
            <div style={listStyle}>
                <Button 
                    size="sm"
                    variant="primary" 
                    type="button"
                    onClick={() => handleAcceptInvite({groupId: group._id})}
                    style={buttonStyle}
                >
                    Accept Invitation
                </Button>
                <strong>{group.name}</strong>
                {` owned by ${owner}`}
            </div>
        )
    });

    const groupContainer = {
        border: "1px solid black",
        margin: "0.5rem",
        backgroundColor: "antiquewhite",
        borderRadius: "0.5rem",
        padding: "0.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        width: "37rem"
    }

    return (
        <div style={groupContainer}>
            {invitationList.length > 0 ? invitationList : "None"}
        </div>
    )
}

export default GroupInvitations;