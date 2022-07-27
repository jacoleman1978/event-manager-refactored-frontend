import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import GroupDataService from "../../services/groupDataService";
import UserDataService from "../../services/userDataService";


const OwnedGroup = (props) => {
    // Get props
    const {group} = props;

    // Set state to get information from the form
    let [editFlag, setEditFlag] = useState(false);
    let [inviteFlag, setInviteFlag] = useState(false);
    let [resultsFlag, setResultsFlag] = useState(false);
    let [newInviteFlag, setNewInviteFlag] = useState(false);
    let [groupName, setGroupName] = useState(group.name);
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [searchResults, setSearchResults] = useState([]);
    let [formattedResults, setFormattedResults] = useState([]);
    let [changedPermissionList, setPermission] = useState([]);
    let [removeMemberList, setRemoveMemberList] = useState([]);

    let users = [group.ownerId];

    useEffect(() => {
        if (editFlag === false) {
            setGroupName(group.name);
        } 

        if (resultsFlag === true) {
            setFormattedResults(handleSearchDisplay(searchResults));
        }
    }, [editFlag, resultsFlag, newInviteFlag])

    const handleSubmit = (e) => {
        e.preventDefault();

        setEditFlag(false);

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

        if (removeMemberList.length > 0) {
            let filteredToRemoveList = new Set([...removeMemberList])
            for (let removedUserId of filteredToRemoveList) {
                data.removedUserId = removedUserId;

                GroupDataService.RemoveGroupMember(data);
            }
        }
    }

    const handleRadio = (e) => {
        setPermission([...changedPermissionList, e.target.id.split("-")]);
    }

    const handleInvite = (invitedUserId) => {
        let data = {
            groupId: group._id,
            invitedUserId: invitedUserId
        }

        let success = GroupDataService.InviteGroupMember(data);

        setNewInviteFlag(success.invited);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchResults([]);
        setFormattedResults([]);
        setResultsFlag(false);

        let data = {
            firstName: firstName,
            lastName: lastName
        }

        UserDataService.SearchUser(data).then(res => {
            if (res.data.searchResults.length > 0) {
                let filteredSearch = res.data.searchResults.filter((result) => {
                    return users.includes(result._id) === false
                });

                setSearchResults(filteredSearch);

                setResultsFlag(true);
            }
        })
    }

    const handleSearchDisplay = (searchResults) => {
        let userNameList = searchResults.map((user) => {
            return (
                <div key={`${user._id}`} style={formGroupStyle}>
                    {`${user.firstName} ${user.lastName}`}
                    <Button 
                        size="sm"
                        variant="primary" 
                        type="button"
                        onClick={() => handleInvite(user._id)}
                    >
                        Invite User
                    </Button>
                </div>
            )
        })

        return userNameList
    }

    const handleRemoveMemberCheck = (e, removedUserId) => {
        if (e.target.checked === true) {
            setRemoveMemberList([...removeMemberList, removedUserId])
        }
    }

    const groupContainer = {
        border: "1px solid black",
        margin: "0.5rem",
        backgroundColor: "antiquewhite",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1rem"
    }

    const groupStyle = {
        display: "flex",
        justifyContent: "center",
        gap: "1rem"
    }

    const groupLabel = {
        marginBottom: "0rem",
        textDecoration: "underline",
        fontSize: "larger",
        fontWeight: "bold"
    }

    const formStyle = {
        border: "1px solid black",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        width: "48%"
    }

    const memberStyle = {
        display: "flex",
        gap: "0.5rem",
        justifyContent: "left"
    }

    const formGroupStyle = {
        display: "flex",
        gap: "0.5rem",
        marginBottom: "0rem",
        justifyContent: "left",
        alignItems: "center"
    }

    const searchStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        marginBottom: "0rem",
        justifyContent: "center",
        alignItems: "left"
    }

    const labelStyle = {
        display: "flex",
        justifyContent: "left",
        fontWeight: "bold",
        marginBottom: "0rem"
    }

    const inputStyle = {
        width: "15rem"
    }

    const editorsList = group.editorIds.map((member) => {
        users.push(member._id);

        return (
            <li key={`${member.userName}`} style={memberStyle}>
                {`${member.firstName} ${member.lastName}`}
                <Form.Check 
                    defaultChecked={true}
                    type="radio"
                    id={`${member._id}-Editor`}
                    label={`Editor`}
                    name={`${member.userName}`}
                    disabled={!editFlag}
                    onChange={handleRadio}
                />
                <Form.Check 
                    type="radio"
                    id={`${member._id}-Viewer`}
                    label={`Viewer`}
                    name={`${member.userName}`}
                    disabled={!editFlag}
                    onChange={handleRadio}
                />
                <Form.Check 
                    type="checkbox"
                    id={`${member._id}-Remove`}
                    label={`Remove Member`}
                    disabled={!editFlag}
                    onChange={(e) => handleRemoveMemberCheck(e, member._id)}
                />
            </li>
        )
    })

    const viewersList = group.viewerIds.map((member) => {
        users.push(member._id);

        return (
            <li key={`${member.userName}`} style={memberStyle}>
                {`${member.firstName} ${member.lastName}`}
                <Form.Check 
                    type="radio"
                    id={`${member._id}-Editor`}
                    label={`Editor`}
                    name={`${member.userName}`}
                    disabled={!editFlag}
                    onChange={handleRadio}
                />
                <Form.Check 
                    type="radio"
                    defaultChecked={true}
                    id={`${member._id}-Viewer`}
                    label={`Viewer`}
                    name={`${member.userName}`}
                    disabled={!editFlag}
                    onChange={handleRadio}
                />
                <Form.Check 
                    type="checkbox"
                    id={`${member._id}-Remove`}
                    label={`Remove Member`}
                    disabled={!editFlag}
                    onChange={(e) => handleRemoveMemberCheck(e, member._id)}
                />
            </li>
        )
    })

    const invitees = group.inviteeIds.map((inviteeId) => {
        users.push(inviteeId._id);

        return (
            <li key={`${inviteeId.userName}`} style={memberStyle}>
                {`${inviteeId.firstName} ${inviteeId.lastName}`}
            </li>
        )
    })

    return (
        <div style={groupContainer}>
            <p style={groupLabel}>{group.name}</p>
            <div style={groupStyle}>
                
                <Form onSubmit={handleSubmit} style={formStyle}>
                    <Form.Group controlId="formGroupName" style={formGroupStyle}>
                        <Form.Label style={labelStyle}>Group Name:</Form.Label>
                        <Form.Control 
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            required
                            style={inputStyle}
                            disabled={!editFlag}
                        />
                        <Form.Check 
                            type="switch"
                            id="edit-group"
                            label="Edit Group"
                            checked={editFlag}
                            onChange={() => setEditFlag(!editFlag)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label style={labelStyle}>Members:</Form.Label>
                        <ul>
                            {editorsList.length > 0 ? editorsList : ""} 
                            {viewersList.length > 0 ? viewersList : ""} 
                        </ul>
                    </Form.Group>

                    <Form.Group >
                        <Form.Label style={labelStyle}>People Invited:</Form.Label>
                        <ul>
                            {invitees.length > 0 ? invitees : ""}
                        </ul>
                    </Form.Group>

                    <Button 
                        variant="danger" 
                        type="submit"
                        disabled={!editFlag}
                    >
                        Save
                    </Button>

                </Form>

                <Form style={formStyle}>
                    <Form.Check 
                        type="switch"
                        id="invite-user"
                        label="Invite New User"
                        checked={inviteFlag}
                        onChange={() => setInviteFlag(!inviteFlag)}
                        style={formGroupStyle}
                    />
                    
                    <Form.Group controlId="formSearchInvite" style={searchStyle}>
                    <div style={formGroupStyle}>
                        <Form.Label style={labelStyle}>First Name:</Form.Label>
                        <Form.Control 
                            type="text"
                            onChange={(e) => setFirstName(e.target.value)}
                            style={inputStyle}
                            disabled={!inviteFlag}
                        />
                    </div>

                    <div style={formGroupStyle}>
                        <Form.Label style={labelStyle}>Last Name:</Form.Label>
                        <Form.Control 
                            type="text"
                            onChange={(e) => setLastName(e.target.value)}
                            style={inputStyle}
                            disabled={!inviteFlag}
                        />
                    </div>

                    <Button 
                        variant="success" 
                        type="button"
                        disabled={!inviteFlag}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>

                    {resultsFlag === true ? formattedResults : ""}

                </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default OwnedGroup;