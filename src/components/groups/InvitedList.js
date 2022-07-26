import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import GroupDataService from "../../services/groupDataService";
import makeCheckboxUsersList from "./helpers/makeCheckboxUsersList";
import getFullUserName from "./helpers/getFullUserName";

// Called from EditGroup.js
// Get and display a list of invited users for the group
const InvitedList = ({groupId, setCheckboxAction, updatedDataFlag}) => {
    let [invitedUsers, setInvitedUsers] = useState([]);

    useEffect(() => {
        GroupDataService.GetGroupById(groupId).then(res => 
            {
                let invitedUsers = res.data.groupDoc.inviteeIds;
                let tempInvitedUsersList = [];

                for (let user in invitedUsers) {
                    tempInvitedUsersList = [
                        ...tempInvitedUsersList,
                        {
                            userId: invitedUsers[user]._id,
                            userName: invitedUsers[user].userName,
                            fullName: getFullUserName(invitedUsers[user])
                        }
                    ]
                }

                setInvitedUsers(makeCheckboxUsersList(tempInvitedUsersList, setCheckboxAction, "Remove")); 
            } 
        )
    }, [updatedDataFlag])

    return (
        <Form.Group >
            <Form.Label className="flex-left-bold">People Invited:</Form.Label>
            <ul className="flex-col-center-left-no-gap small-gap">
                {invitedUsers.length > 0 ? invitedUsers : <div className="small-font small-padding">None</div>}
            </ul>
        </Form.Group>
    )
}

export default InvitedList;