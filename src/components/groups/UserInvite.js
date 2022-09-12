import React from "react";
import { Button } from "react-bootstrap";
import GroupDataService from "../../services/groupDataService";

// Called from SearchResults.js
// Display the full name of the user to invite with an "Invite User" button
const UserInvite = ({user, data, setHasInvitedMember, setInvitedUserId}) => {
    // Add the member to the group's inviteeId list and maintain state on invited users
    const handleUserInvite = () => {
        GroupDataService.InviteGroupMember(data).then(() => {
            setHasInvitedMember(true);
            setInvitedUserId(user._id);
        })
    }

    return (
        <div key={`${user._id}`} className="list-items small-gap">
            {`${user.firstName} ${user.lastName}`}
            <Button 
                className="xsmall-padding xsmall-top-bottom-margin"
                size="sm"
                variant="primary" 
                type="button"
                onClick={handleUserInvite}
            >
                Invite User
            </Button>
        </div>
    )
}

export default UserInvite;