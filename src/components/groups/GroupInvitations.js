import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import GroupDataService from "../../services/groupDataService";

const GroupInvitations = (props) => {
    // Get props
    const {groupInvitations} = props;

    let [inviteFlag, setInviteFlag] = useState(false);

    useEffect(() => {
        if (inviteFlag === true) {

        }
    }, [inviteFlag])

    const handleAcceptInvite = (groupId) => {
        setInviteFlag(true);
        GroupDataService.AcceptGroupInvite(groupId);
        setInviteFlag(false)
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
            <div style={listStyle} key={group.name}>
                <Button 
                    size="sm"
                    variant="primary" 
                    type="button"
                    onClick={() => handleAcceptInvite({groupId: group._id})}
                    style={buttonStyle}
                >
                    Accept
                </Button>
                <strong>{group.name}</strong>
                {` owned by ${owner}`}
            </div>
        )
    });

    return (
        <div className="group-container">
            {invitationList.length > 0 ? invitationList : "None"}
        </div>
    )
}

export default GroupInvitations;