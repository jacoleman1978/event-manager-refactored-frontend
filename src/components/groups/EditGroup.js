import React, {useState, useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import GroupDataService from "../../services/groupDataService";
import InviteUser from "./InviteUser";

const EditGroup = (props) => {
    // Get props
    const {group, newInviteFlag, setNewInviteFlag} = props;

    let [groupName, setGroupName] = useState(group.name);
    let [changedPermissionList, setPermission] = useState([]);
    let [groupEditorsList, setEditorsList] = useState([]);
    let [groupViewersList, setViewersList] = useState([]);
    let [groupInvitedList, setInvitedList] = useState([]);
    let [usersToRemoveList, setUsersToRemove] = useState([]);

    let usersToRemove = [];

    const makeUserList = (members, type) => {
        const usersList = members.map((member) => {
            let userId = member._id
    
            return (
                <li key={`${member.userName}`} className="list-items">
                    {`${member.firstName} ${member.lastName}`}
                    <Form.Check 
                        defaultChecked={type === 'Editor'}
                        type="radio"
                        id={`${userId}-Editor`}
                        label={'Editor'}
                        name={`${member.userName}`}
                        onChange={handleRadio}
                    />
                    <Form.Check 
                        defaultChecked={type === 'Viewer'}
                        type="radio"
                        id={`${userId}-Viewer`}
                        label={'Viewer'}
                        name={`${member.userName}`}
                        onChange={handleRadio}
                    />
                    <Form.Check 
                        type="checkbox"
                        id={`${userId}-Remove`}
                        label={`Remove`}
                        onChange={(e) => handleRemoveMemberCheck(userId, e)}
                    />
                </li>
            )
        })

        if (type === 'Editor') {
            setEditorsList(usersList);
        } else if (type === 'Viewer') {
            setViewersList(usersList);
        }
    }

    const makeInviteesList = (groupInvitations) => {
        const invitees = groupInvitations.map((inviteeId) => {
            let userId = inviteeId._id

            setNewInviteFlag(false);
    
            return (
                <li key={`${inviteeId.userName}`} className="list-items">
                    {`${inviteeId.firstName} ${inviteeId.lastName}`}
                    <Form.Check 
                        type="checkbox"
                        id={`${userId}-Remove`}
                        label={`Remove Invitation`}
                        onChange={(e) => handleRemoveMemberCheck(userId, e)}
                    />
                </li>
            )
        })

        setInvitedList(invitees);
    }

    useEffect(() => {
        if (groupEditorsList.length === 0) {
            makeUserList(group.editorIds, 'Editor');
        }

        if (groupViewersList.length === 0) {
            makeUserList(group.viewerIds, 'Viewer');
        }
        

        if (newInviteFlag === true) {
            GroupDataService.GetGroupById(group._id).then(res => 
                makeInviteesList(res.data.groupDoc.inviteeIds)    
            )
        }
    }, [newInviteFlag])

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = {
            groupId: group._id,
            groupName: groupName,
            userIdPrivChange: "",
            newEditPrivilege: "",
            removedUserId: "",
        }

        if (groupName !== group.name) {
            GroupDataService.ChangeGroupName(data);
        }

        if (changedPermissionList.length > 0) {
            for (let userData of changedPermissionList) {
                data.userIdPrivChange = userData[0];
                data.newEditPrivilege = userData[1];

                GroupDataService.ChangeEditPrivilege(data);
            }
        }

        if (usersToRemoveList.length > 0) {
            let filteredToRemoveList = new Set([...usersToRemoveList])

            for (let removedUserId of filteredToRemoveList) {
                data.removedUserId = removedUserId;

                GroupDataService.RemoveGroupMember(data);
            }
        }
    }

    const handleRadio = (e) => {
        setPermission([...changedPermissionList, e.target.id.split("-")]);
    }

    const handleRemoveMemberCheck = (removedUserId, e) => {
        if (e.target.checked === true) {
            usersToRemove.push(removedUserId);

        } else if (e.target.checked === false) {
            const index = usersToRemove.indexOf(removedUserId);
            if (index > -1) { 
                usersToRemove.splice(index, 1); 
            }
        }

        setUsersToRemove(usersToRemove);

    }

    return (
        <div className="group-container">
            <div className="flex-center-wrap">
                <Form onSubmit={(e) => handleSubmit(e)} className="border">
                    <Form.Group controlId="formGroupName" className="flex-left-center">
                        <Form.Label className="flex-left-bold">Group Name:</Form.Label>
                        <Form.Control 
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            required
                            className="input-width"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="flex-left-bold">Members:</Form.Label>
                        <ul>
                            {groupEditorsList.length > 0 ? groupEditorsList : ""} 
                            {groupViewersList.length > 0 ? groupViewersList : ""} 
                        </ul>
                    </Form.Group>

                    <Form.Group >
                        <Form.Label className="flex-left-bold">People Invited:</Form.Label>
                        <ul>
                            {groupInvitedList.length > 0 ? groupInvitedList : ""}
                        </ul>
                    </Form.Group>

                    <Button 
                        variant="danger" 
                        type="submit"
                    >
                        Save
                    </Button>

                </Form>

                <InviteUser 
                    group={group} 
                    setNewInviteFlag={setNewInviteFlag}
                />
            </div>
        </div>
    )
}

export default EditGroup;