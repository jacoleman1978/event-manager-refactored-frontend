import React, { useState, useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import { CurrentUser } from '../../contexts/currentUser';
import GroupDataService from "../../services/groupDataService";
import OwnedGroup from "./OwnedGroup";
import GroupMembership from "./GroupMemberShip";
import GroupInvitations from "./GroupInvitations";
import NewGroupForm from "./NewGroupForm";

const Groups = (props) => {
    const { currentUser } = useContext(CurrentUser);

    // Use State for data pulled from database
    let [ownedGroup, setOwnedGroup] = useState([]);
    let [groupMemberships, setGroupMemberships] = useState([]);
    let [groupInvitations, setGroupInvitations] = useState([]);
    let [editFlag, setEditFlag] = useState(false);
    
    useEffect(() => {
        if (currentUser !== null) {
            GroupDataService.GetOwnedGroups().then(res => setOwnedGroup(res.data.ownedGroups));

            GroupDataService.GetGroupMemberships().then(res => setGroupMemberships(res.data.groupMemberships));

            GroupDataService.GetGroupInvitations().then(res => setGroupInvitations(res.data.groupInvitations));
        }
    }, [currentUser])

    let ownedGroups = ownedGroup.map((group, i) => {
        return (
            <OwnedGroup group={group} editFlag={editFlag}  key={`owned-${i}`}/>
        )
    });

    let membershipList = groupMemberships.map((group, i) => {
        return (
            <GroupMembership group={group} key={`member-${i}`}/>
        )
    });

    const groupSectionStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    }

    return (
        <div>
            <p className="title">Group Invitations</p>
            <div style={groupSectionStyle}>
                <GroupInvitations groupInvitations={groupInvitations} />
            </div>

            <div className="flex-centered">
                <NewGroupForm />
            </div>
            
            <div className="flex-centered">
                <p className="title">Owned Groups</p>
                <div className="flex-center-wrap">
                    <Form.Check 
                        type="switch"
                        id="edit-group"
                        label="Edit Groups"
                        checked={editFlag}
                        onChange={() => setEditFlag(!editFlag)}
                    />
                </div>
            </div>

            <div style={groupSectionStyle}>
                {ownedGroups}
            </div>
            
            <p className="title">Group Membership</p>
            <div style={groupSectionStyle}>
                {membershipList}
            </div>

        </div>
        
    )
}

export default Groups;