import React from "react";
import GroupMembership from "./GroupMembership";
import EditGroup from "./EditGroup";

// Called from Groups.js
const OwnedGroup = ({group, editFlag, deleteFlag,setDeleteFlag}) => {
    // The editFlag toggles between the Edit Event Form and a group card
    return (
        <>
            {editFlag === true ? 
                <EditGroup
                    groupId={group._id} 
                    deleteFlag={deleteFlag}
                    setDeleteFlag={setDeleteFlag}
                /> : 
                <GroupMembership 
                    group={group} 
                />
            }
        </>

    )
}

export default OwnedGroup;