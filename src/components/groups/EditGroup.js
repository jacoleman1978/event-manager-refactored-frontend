import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import GroupDataService from "../../services/groupDataService";
import InviteUser from "./InviteUser";
import GroupNameInput from "./GroupNameInput";
import MembersList from "./MembersList";
import InvitedList from "./InvitedList";
import updateGroup from "./helpers/updateGroup";
import updateCheckedUsers from "../../helpers/updateCheckedUsers";
import updateMemberChange from "./helpers/updateMemberChange";

// Called from OwnedGroup.js
const EditGroup = ({groupId}) => {
    let [groupData, setGroupData] = useState(null);
    let [formGroupName, setGroupName] = useState("");
    let [wasDataSaved, setWasDataSaved] = useState(false);
    let [changedPermissionList, setPermissionList] = useState([]);
    let [usersToRemoveList, setUsersToRemove] = useState([]);
    let [checkboxAction, setCheckboxAction] = useState({addId: "", removeId: ""});
    let [permissionChange, setPermissionChange] = useState({addId: [], removeId: []});
    let [editableFieldsDisplay, setEditableFieldsDisplay] = useState([]);
    let [updatedDataFlag, setUpdatedDataFlag] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (checkboxAction.addId !== "" || checkboxAction.removeId !== "") {
            setUsersToRemove(updateCheckedUsers(checkboxAction, usersToRemoveList));
        }
    }, [checkboxAction])

    useEffect(() => {
        if (permissionChange.addId.length > 0 || permissionChange.removeId.length > 0) {
            setPermissionList(updateMemberChange(permissionChange, changedPermissionList));
        }
    }, [permissionChange])

    useEffect(() => {
        if (groupData !== null) {
            setEditableFieldsDisplay([
                <GroupNameInput key={0} groupName={groupData.name} setGroupName={setGroupName} />,
                <MembersList key={1} editorIds={groupData.editorIds} viewerIds={groupData.viewerIds} setPermissionChange={setPermissionChange} setCheckboxAction={setCheckboxAction} updatedDataFlag={updatedDataFlag}/>,
                <InvitedList key={2} groupId={groupId} setCheckboxAction={setCheckboxAction} updatedDataFlag={updatedDataFlag}/>
            ])
        }

    }, [groupData])

    const getData = () => {
        GroupDataService.GetGroupById(groupId).then((res) => {
            let data = res.data.groupDoc

            setGroupData(data);
            setGroupName(data.name);

            setEditableFieldsDisplay([
                <GroupNameInput key={0} groupName={data.name} setGroupName={setGroupName} />,
                <MembersList key={1} editorIds={data.editorIds} viewerIds={data.viewerIds} setPermissionChange={setPermissionChange} setCheckboxAction={setCheckboxAction} />,
                <InvitedList key={2} groupId={groupId} setCheckboxAction={setCheckboxAction} />
            ])
        })
    }

    if (wasDataSaved) {
        setWasDataSaved(false);
        getData()
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
                
                <InviteUser group={groupData} />
            </div>
        </div>
    )
}

export default EditGroup;