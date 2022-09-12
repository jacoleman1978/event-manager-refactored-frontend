import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import GroupDataService from "../../services/groupDataService";
import UserSearch from "./UserSearch";
import MembersList from "./MembersList";
import InvitedList from "./InvitedList";
import DeleteGroup from "./DeleteGroup";
import TextInputWrapper from "./TextInputWrapper";
import updateGroup from "./helpers/updateGroup";
import updateCheckedUsers from "./helpers/updateCheckedUsers";
import updateMemberChange from "./helpers/updateMemberChange";

// Called from OwnedGroup.js
const EditGroup = ({groupId, setGroups}) => {
    let [groupData, setGroupData] = useState(null);
    let [formGroupName, setGroupName] = useState("");
    let [wasDataSaved, setWasDataSaved] = useState(false);
    let [changedPermissionList, setPermissionList] = useState([]);
    let [usersToRemoveList, setUsersToRemove] = useState([]);
    let [checkboxAction, setCheckboxAction] = useState({addId: "", removeId: ""});
    let [permissionChange, setPermissionChange] = useState({addId: [], removeId: []});
    let [editableFieldsDisplay, setEditableFieldsDisplay] = useState([]);
    let [updatedDataFlag, setUpdatedDataFlag] = useState(true);
    let [hasInvitedMember, setHasInvitedMember] = useState(false);

    // Get the group's document and set the displays
    useEffect(() => {
        getData();
    }, [groupId])

    // Maintain the current list of checked boxes for users to remove
    useEffect(() => {
        if (checkboxAction.addId !== "" || checkboxAction.removeId !== "") {
            setUsersToRemove(updateCheckedUsers(checkboxAction, usersToRemoveList));
        }
    }, [checkboxAction])

    // Maintain the current list of users who have had their permissions changed
    useEffect(() => {
        if (permissionChange.addId.length > 0 || permissionChange.removeId.length > 0) {
            setPermissionList(updateMemberChange(permissionChange, changedPermissionList));
        }
    }, [permissionChange])

    // Whenever the groupData has changed, display the updated information
    useEffect(() => {
        if (groupData !== null) {
            setEditableFieldsDisplay([
                <TextInputWrapper key={0} label={"Group Name"} defaultValue={groupData.name} setStateValue={setGroupName} />,
                <MembersList key={1} editorIds={groupData.editorIds} viewerIds={groupData.viewerIds} setPermissionChange={setPermissionChange} setCheckboxAction={setCheckboxAction} updatedDataFlag={updatedDataFlag}/>,
                <InvitedList key={2} groupId={groupId} setCheckboxAction={setCheckboxAction} updatedDataFlag={updatedDataFlag}/>
            ])
        }

    }, [groupData])

    // Get the group data and set the information to be displayed
    const getData = () => {
        GroupDataService.GetGroupById(groupId).then((res) => {
            let data = res.data.groupDoc

            setGroupData(data);
            setGroupName(data.name);

            setEditableFieldsDisplay([
                <TextInputWrapper key={0} label={"Group Name"} defaultValue={data.name} setStateValue={setGroupName} />,
                <MembersList key={1} editorIds={data.editorIds} viewerIds={data.viewerIds} setPermissionChange={setPermissionChange} setCheckboxAction={setCheckboxAction} />,
                <InvitedList key={2} groupId={groupId} setCheckboxAction={setCheckboxAction} />
            ])
        })
    }

    // If the data was saved, get the updated data to display
    if (wasDataSaved) {
        setWasDataSaved(false);
        getData();
    }

    // If a new member has been invited to join the group, get the updated data to display
    if (hasInvitedMember) {
        setHasInvitedMember(false);
        getData();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setWasDataSaved(true);
        updateGroup(groupId, formGroupName, groupData.name, changedPermissionList, usersToRemoveList);
        setUpdatedDataFlag(!updatedDataFlag);
    }

    return (
        <div className="week-wrapper">
            <div className="group-container-no-set-width">
                <Form onSubmit={(e) => handleSubmit(e)} className="week-wrapper">

                    {editableFieldsDisplay}
                    <Button 
                        variant="danger" 
                        type="submit"
                    >
                        Save
                    </Button>

                </Form>
                
                <UserSearch group={groupData} setHasInvitedMember={setHasInvitedMember} />

                <DeleteGroup groupId={groupId} setGroups={setGroups} />
            </div>
        </div>
    )
}

export default EditGroup;