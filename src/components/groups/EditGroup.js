import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import InviteUser from "./InviteUser";
import GroupNameInput from "./GroupNameInput";
import MembersList from "./MembersList";
import InvitedList from "./InvitedList";
import updateGroup from "./helpers/updateGroup";
import updateCheckedUsers from "../../helpers/updateCheckedUsers";
import updateMemberChange from "./helpers/updateMemberChange";

const EditGroup = ({group}) => {
    let [formGroupName, setGroupName] = useState(group.name);
    let [changedPermissionList, setPermissionList] = useState([]);
    let [usersToRemoveList, setUsersToRemove] = useState([]);
    let [checkboxAction, setCheckboxAction] = useState({addId: "", removeId: ""});
    let [permissionChange, setPermissionChange] = useState({addId: [], removeId: []});

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

        updateGroup(group._id, formGroupName, group.name, changedPermissionList, usersToRemoveList);
    }

    return (
        <div className="group-container">
            <div className="flex-center-wrap">
                <Form onSubmit={(e) => handleSubmit(e)} className="border">

                    <GroupNameInput groupName={formGroupName} setGroupName={setGroupName} />

                    <MembersList editorIds={group.editorIds} viewerIds={group.viewerIds} setPermissionChange={setPermissionChange} setCheckboxAction={setCheckboxAction} />

                    <InvitedList groupId={group._id} setCheckboxAction={setCheckboxAction} />

                    <Button 
                        variant="danger" 
                        type="submit"
                    >
                        Save
                    </Button>

                </Form>

                <InviteUser 
                    group={group} 
                />
            </div>
        </div>
    )
}

export default EditGroup;