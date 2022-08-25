import React from "react";
import GroupMembership from "./GroupMemberShip";
import EditGroup from "./EditGroup";

const OwnedGroup = (props) => {
    // Get props
    const {group, editFlag} = props;

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