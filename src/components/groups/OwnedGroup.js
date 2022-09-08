import React from "react";
import GroupMembership from "./GroupMembership";
import EditGroup from "./EditGroup";

// Called from Groups.js
const OwnedGroup = ({group, editFlag, setGroups}) => {
    // The editFlag toggles between the Edit Event Form and a group card
    return (
        <>
            {editFlag === true ? 
                <EditGroup
                    groupId={group._id} 
                    setGroups={setGroups}
                /> : 
                <GroupMembership 
                    group={group} 
                />
            }
        </>

    )
}

export default OwnedGroup;