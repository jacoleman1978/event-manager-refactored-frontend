import React from "react";
import UsersList from "./UsersList";

// Called by Groups.js
// Displays a simple version of the title and members of a group, including invitees
const GroupMembers = ({group}) => {
    return (
        <div className="group-container-no-set-width">
            <p className="title">{group.name}</p>
            <hr />

            <UsersList userHeader={"Owner"} userDocs={[group.ownerId]} />
            <UsersList userHeader={"Editor Members"} userDocs={group.editorIds} />
            <UsersList userHeader={"Viewer Members"} userDocs={group.viewerIds} />
            <UsersList userHeader={"People Invited to Join"} userDocs={group.inviteeIds} />
        </div>
    )
}

export default GroupMembers;