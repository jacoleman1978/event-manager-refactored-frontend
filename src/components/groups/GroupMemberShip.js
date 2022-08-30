import React from "react";
import UsersList from "./UsersList";

const GroupMembership = ({group}) => {
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

export default GroupMembership;