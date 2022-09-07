import React from "react";
import { Button } from "react-bootstrap";
import GroupDataService from "../../services/groupDataService";

// Called from SearchResults.js
const UserInvite = ({user, data, setHasInvitedMember, setInvitedUserId}) => {
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