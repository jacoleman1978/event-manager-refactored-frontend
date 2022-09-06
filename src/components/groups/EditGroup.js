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
const EditGroup = ({group}) => {
    let [groupData, setGroupData] = useState(group);
    let [editableFieldsDisplay, setEditableFieldsDisplay] = useState([]);
    let [updatedDataFlag, setUpdatedDataFlag] = useState(true);
    let [formGroupName, setGroupName] = useState(group.name);
    let [changedPermissionList, setPermissionList] = useState([]);
    let [usersToRemoveList, setUsersToRemove] = useState([]);
    let [checkboxAction, setCheckboxAction] = useState({addId: "", removeId: ""});
    let [permissionChange, setPermissionChange] = useState({addId: [], removeId: []});

    useEffect(() => {
        setEditableFieldsDisplay([
            <GroupNameInput key={0} groupName={formGroupName} setGroupName={setGroupName} />,
            <MembersList key={1} editorIds={groupData.editorIds} viewerIds={groupData.viewerIds} setPermissionChange={setPermissionChange} setCheckboxAction={setCheckboxAction} />,
            <InvitedList key={2} groupId={group._id} setCheckboxAction={setCheckboxAction} updatedDataFlag={updatedDataFlag} />
        ])
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

    const handleSubmit = (e) => {
        e.preventDefault();

        setUpdatedDataFlag(false);

        updateGroup(group._id, formGroupName, groupData.name, changedPermissionList, usersToRemoveList);

        let tempGroupData = {...groupData}
        let {editorIds, viewerIds} = tempGroupData;

        if (usersToRemoveList.length > 0) {
            tempGroupData.editorIds = [];
            tempGroupData.viewerIds = [];

            for (let userId of usersToRemoveList) {
                if (editorIds.length > 0) {
                    for (let i = 0; i < editorIds.length; i++) {
                        if (userId !== editorIds[i]._id) {
                            tempGroupData.editorIds = [...tempGroupData.editorIds, editorIds[i]];
                        }
                    }
                }
        
                if (viewerIds.length > 0) {
                    for (let j = 0; j < viewerIds.length; j++) {
                        if (userId !== viewerIds[j]._id) {
                            tempGroupData.viewerIds = [...tempGroupData.viewerIds, viewerIds[j]];
                        }
                    }
        
                }
            }
        }
        console.log(tempGroupData)

        setGroupData(tempGroupData);

        setEditableFieldsDisplay([
            <GroupNameInput key={0} groupName={formGroupName} setGroupName={setGroupName} />,
            <MembersList key={1} editorIds={tempGroupData.editorIds} viewerIds={tempGroupData.viewerIds} setPermissionChange={setPermissionChange} setCheckboxAction={setCheckboxAction} />,
            <InvitedList key={2} groupId={group._id} setCheckboxAction={setCheckboxAction} updatedDataFlag={updatedDataFlag} />
        ])

        setUpdatedDataFlag(true);
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