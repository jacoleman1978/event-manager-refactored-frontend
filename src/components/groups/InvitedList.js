import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import GroupDataService from "../../services/groupDataService";
import makeInviteesList from "./helpers/makeInviteesList";

// Called from EditGroup.js
const InvitedList = ({groupId, setCheckboxAction}) => {
    let [groupInvitedList, setInvitedList] = useState([]);

    useEffect(() => {
        GroupDataService.GetGroupById(groupId).then(res => 
            setInvitedList(makeInviteesList(res.data.groupDoc.inviteeIds, setCheckboxAction))    
        )
    }, [])
    return (
        <Form.Group >
            <Form.Label className="flex-left-bold">People Invited:</Form.Label>
            <ul>
                {groupInvitedList.length > 0 ? groupInvitedList : "None"}
            </ul>
        </Form.Group>
    )
}

export default InvitedList;