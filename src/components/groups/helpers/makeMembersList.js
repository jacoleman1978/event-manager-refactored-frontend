import React from "react";
import PermissionRadios from "../PermissionRadios";
import RemoveMemberCheckbox from "../RemoveMemberCheckbox";

// Called by MembersList.js
/*
-members is a list of member objects with type of 'Editor' for group.editorIds or type of 'Viewer' for group.viewerIds
-stateManagment is an object with states that need to be maintained in the EditGroup.js React component
-Returns a list of list items of the user's name, appropriately checked permission radio button and an unchecked 'Remove' checkbox for the user
*/
const makeMembersList = (members, type, setPermissionChange, setCheckboxAction) => {
    const membersList = members.map((member) => {
        let userId = member._id

        return (
            <li key={`${member.userName}`} className="list-items">
                {`${member.firstName} ${member.lastName}:`}

                <div className="flex-centered small-gap auto-margin-left">
                    <PermissionRadios type={type} userId={userId} setPermissionChange={setPermissionChange} />

                    <RemoveMemberCheckbox userId={userId} setCheckboxAction={setCheckboxAction} />
                </div>

            </li>
        )
    })

    return membersList
}

export default makeMembersList;