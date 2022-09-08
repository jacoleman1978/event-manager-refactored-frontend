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

    let [groups, setGroups] = useState([]);
    let [ownedGroupDisplay, setOwnedGroupDisplay] = useState([]);
    let [newGroupDisplay, setNewGroupDisplay] = useState([]);
    let [groupMemberships, setGroupMemberships] = useState([]);
    let [groupInvitations, setGroupInvitations] = useState([]);
    let [editFlag, setEditFlag] = useState(false);
    let [createFlag, setCreateFlag] = useState(false);
    
    useEffect(() => {
        if (currentUser !== null) {
            getOwnedGroupDisplay();

            GroupDataService.GetGroupMemberships().then(res => setGroupMemberships(res.data.groupMemberships));

            GroupDataService.GetGroupInvitations().then(res => setGroupInvitations(res.data.groupInvitations));

            setNewGroupDisplay([<NewGroupForm key={"new group"} setCreateFlag={setCreateFlag} />])
        }
    }, [currentUser, editFlag])

    useEffect(() => {
        if (groups.length > 0) {
            let ownedGroups = groups.map((group, i) => {
                return (
                    <OwnedGroup group={group} editFlag={editFlag} setGroups={setGroups} key={`owned-${i}`}/>
                )
            })
            setOwnedGroupDisplay(ownedGroups);
            setGroups([]);
        }
    }, [groups])

    const getOwnedGroupDisplay = () => {
        GroupDataService.GetOwnedGroups().then((res) => {
            let ownedGroups = res.data.ownedGroups.map((group, i) => {
                return (
                    <OwnedGroup group={group} editFlag={editFlag} setGroups={setGroups} key={`owned-${i}`}/>
                )
            })
            setOwnedGroupDisplay(ownedGroups);
        });
    }

    if (createFlag) {
        setCreateFlag(false);
        getOwnedGroupDisplay();
        setNewGroupDisplay([<NewGroupForm key={"new group reset"} setCreateFlag={setCreateFlag} />])
    }

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
                {newGroupDisplay}
            </div>
            
            <div className="flex-centered">
                <p className="title">Owned Groups</p>
                <div className="flex-center-wrap">
                    <Form.Check 
                        className="flex-centered-no-gap xsmall-gap"
                        type="switch"
                        id="edit-group"
                        label="Edit Groups"
                        onChange={() => setEditFlag(!editFlag)}
                    />
                </div>
            </div>

            <div className="flex-center-wrap-no-gap outline-row small-top-margin">
                {ownedGroupDisplay}
            </div>
            
            <p className="title">Group Membership</p>
            <div className="flex-center-wrap-no-gap outline-row small-top-margin">
                {membershipList.length > 0 ? membershipList : <div className="outline-inner small-font">None</div>}
            </div>

        </div> 
    )
}

export default Groups;