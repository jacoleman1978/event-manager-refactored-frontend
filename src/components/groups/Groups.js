import React, { useState, useEffect, useContext } from "react";
import { CurrentUser } from '../../contexts/currentUser';
import GroupDataService from "../../services/groupDataService";
import OwnedGroup from "./OwnedGroup";
import GroupMembership from "./GroupMemberShip";
import GroupInvitations from "./GroupInvitations";

const Groups = () => {
    const { currentUser } = useContext(CurrentUser);

    // Use State for data pulled from database
    let [ownedGroup, setOwnedGroup] = useState([]);
    let [groupMemberships, setGroupMemberships] = useState([]);
    let [groupInvitations, setGroupInvitations] = useState([]);
    
    useEffect(() => {
        if (currentUser !== null) {
            GroupDataService.GetOwnedGroups().then(res => setOwnedGroup(res.data.ownedGroups));

            GroupDataService.GetGroupMemberships().then(res => setGroupMemberships(res.data.groupMemberships));

            GroupDataService.GetGroupInvitations().then(res => setGroupInvitations(res.data.groupInvitations));
        }
    }, [currentUser])

    let ownedGroups = ownedGroup.map((group, i) => {
        return (
            <OwnedGroup group={group} key={`owned-${i}`}/>
        )
    });

    let membershipList = groupMemberships.map((group, i) => {
        return (
            <GroupMembership group={group} key={`member-${i}`}/>
        )
    });

    let invitationList = groupInvitations.map((group, i) => {
        return (
            <GroupInvitations group={group} key={`invite-${i}`}/>
        )
    });

    return (
        <div>
            <h1>Owned Groups</h1>
            {ownedGroups}
            <h2>Group Membership</h2>
            {membershipList}
            <h2>Group Invitations</h2>
            {invitationList}
        </div>
        
    )
}

export default Groups;