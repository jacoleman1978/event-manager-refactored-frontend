import React from "react";
import UserInvite from "./UserInvite";

// Called from UserSearch.js
const SearchResults = ({searchResults, groupId, setHasInvitedMember}) => {
    let invitedUsers = searchResults.map((user) => {
        let data = {
            groupId: groupId, 
            invitedUserId: user._id
        }

        return (
            <UserInvite key={user._id} user={user} data={data} setHasInvitedMember={setHasInvitedMember} />
        )
    })
    return (
        <>
            {invitedUsers}
        </>
    )
}

export default SearchResults;