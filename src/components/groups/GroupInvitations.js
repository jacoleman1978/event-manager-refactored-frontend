import React from "react";
import { Button } from "react-bootstrap";
import GroupDataService from "../../services/groupDataService";
import getFullUserName from "./helpers/getFullUserName";

const GroupInvitations = ({groupInvitations}) => {
    let invitationList = groupInvitations.map((group) => {
        return (
            <div className="flex-left-center" key={group.name}>
                <Button 
                    size="sm"
                    variant="primary" 
                    type="button"
                    onClick={() => GroupDataService.AcceptGroupInvite({groupId: group._id})}
                >
                    Accept Invitation
                </Button>

                <p>
                    From <strong>{group.name}</strong> Group
                    {` owned by ${getFullUserName(group.ownerId)}`}
                </p>

            </div>
        )
    });

    return (
        <div className="group-container-no-set-width small-gap">
            {invitationList.length > 0 ? invitationList : "None"}
        </div>
    )
}

export default GroupInvitations;