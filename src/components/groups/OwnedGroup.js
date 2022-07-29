import React, { useState } from "react";
import GroupMembership from "./GroupMemberShip";
import EditGroup from "./EditGroup";

const OwnedGroup = (props) => {
    // Get props
    const {group, editFlag} = props;

    // Set state to get information from the form
    let [newInviteFlag, setNewInviteFlag] = useState(true);

    return (
        <>
            {editFlag === true ? 
                <EditGroup 
                    group={group} 
                    newInviteFlag={newInviteFlag} 
                    setNewInviteFlag={setNewInviteFlag} 
                /> : 
                <GroupMembership 
                    group={group} 
                />
            }
        </>

    )
}

export default OwnedGroup;