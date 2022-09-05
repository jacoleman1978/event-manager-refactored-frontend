import React, { useState, useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import { CurrentUser } from '../../contexts/currentUser';
import GroupDataService from "../../services/groupDataService";
import OwnedGroup from "./OwnedGroup";
import GroupMembership from "./GroupMembership";
import GroupInvitations from "./GroupInvitations";
import NewGroupForm from "./NewGroupForm";

// Called from DisplayContainer.js
const Groups = () => {
    const { currentUser } = useContext(CurrentUser);

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

    // Generate a display list of groups owned by the user
    let ownedGroups = ownedGroup.map((group, i) => {
        return (
            <OwnedGroup group={group} editFlag={editFlag} key={`owned-${i}`}/>
        )
    });

    // Generate a display list of groups that the user is a member of, but does not own
    let membershipList = groupMemberships.map((group, i) => {
        return (
            <GroupMembership group={group} key={`member-${i}`}/>
        )
    });

    return (
        <div>
            <p className="title">Group Invitations</p>
            <div className="flex-center-wrap-no-gap outline-row small-top-margin" >
                <GroupInvitations groupInvitations={groupInvitations} />
            </div>

            <p className="title">Create a New Group</p>
            <div className="flex-centered outline small-top-margin">
                <NewGroupForm />
            </div>
            
            <div className="flex-centered">
                <p className="title">Owned Groups</p>
                <div className="flex-center-wrap">
                    <Form.Check 
                        className="flex-centered-no-gap xsmall-gap"
                        type="switch"
                        id="edit-group"
                        label="Edit Groups"
                        checked={editFlag}
                        onChange={() => setEditFlag(!editFlag)}
                    />
                </div>
            </div>

            <div className="flex-center-wrap-no-gap outline-row small-top-margin">
                {ownedGroups}
            </div>
            
            <p className="title">Group Membership</p>
            <div className="flex-center-wrap-no-gap outline-row small-top-margin">
                {membershipList.length > 0 ? membershipList : <div className="outline-inner small-font">None</div>}
            </div>

        </div> 
    )
}

export default Groups;