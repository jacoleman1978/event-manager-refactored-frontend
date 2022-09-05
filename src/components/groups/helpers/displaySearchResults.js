import React from "react";
import { Button } from "react-bootstrap"
import GroupDataService from "../../../services/groupDataService"

/*
-searchResults is an array of user objects from the database returned from a query
-groupId is the _id of the group document
-Returns html display with user's full name and an 'Invite User' button
*/
const displaySearchResults = (searchResults, groupId) => {
    let userNameList = searchResults.map((user) => {
        let data = {
            groupId: groupId, 
            invitedUserId: user._id
        }

        return (
            <div key={`${user._id}`} className="list-items small-gap">
                {`${user.firstName} ${user.lastName}`}
                <Button 
                    className="xsmall-padding xsmall-top-bottom-margin"
                    size="sm"
                    variant="primary" 
                    type="button"
                    onClick={() => {GroupDataService.InviteGroupMember(data)}}
                >
                    Invite User
                </Button>
            </div>
        )
    })

    return userNameList
}

export default displaySearchResults;