import React from "react";
import GroupMembership from "./GroupMembership";
import EditGroup from "./EditGroup";

// Called from Groups.js
const OwnedGroup = ({group, editFlag}) => {
    // The editFlag toggles between the Edit Event Form and a group card
    return (
        <>
            {editFlag === true ? 
                <EditGroup 
                    group={group} 
                /> : 
                <GroupMembership 
                    group={group} 
                />
            }
        </>

    )
}

export default OwnedGroup;