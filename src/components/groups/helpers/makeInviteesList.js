import React from "react";
import { Form } from "react-bootstrap";
import handleRemoveCheckboxChange from "./handleRemoveCheckboxChange";

/*
-groupInvitations is a list of user objects from group.inviteeIds
-stateManagement is an object with states that need to be maintained in the EditGroup.js React component
-Returns a list of list items of the user's name with a 'Remove Invitation' checkbox
*/
const makeInviteesList = (groupInvitations, setCheckboxAction) => {
    const invitees = groupInvitations.map((inviteeId) => {
        let userId = inviteeId._id

        return (
            <li key={`${inviteeId.userName}`} className="list-items">
                {`${inviteeId.firstName} ${inviteeId.lastName}`}
                <Form.Check 
                    type="checkbox"
                    id={`${userId}-Remove`}
                    label={`Remove Invitation`}
                    onChange={(e) => setCheckboxAction(handleRemoveCheckboxChange(userId, e))}
                />
            </li>
        )
    })

    return invitees;
}

export default makeInviteesList;