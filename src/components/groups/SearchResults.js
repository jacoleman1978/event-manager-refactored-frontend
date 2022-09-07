import React, { useState, useEffect } from "react";
import UserInvite from "./UserInvite";

// Called from UserSearch.js
const SearchResults = ({searchResults, groupId, setHasInvitedMember}) => {
    let [invitedUserId, setInvitedUserId] = useState("");
    let [filteredSearch, setFilteredSearch] = useState(searchResults);
    let [invitedUsers, setInvitedUsers] = useState([]);

    useEffect(() => {
        let filteredSearchResults = filteredSearch.filter((result) => {
            return result._id !== invitedUserId
        })

        setFilteredSearch(filteredSearchResults);
    
        let invitedUserDisplay = filteredSearchResults.map((user) => {
            let data = {
                groupId: groupId, 
                invitedUserId: user._id
            }
    
            return (
                <UserInvite key={user._id} user={user} data={data} setHasInvitedMember={setHasInvitedMember} setInvitedUserId={setInvitedUserId} />
            )
        })

        setInvitedUsers(invitedUserDisplay);
    }, [invitedUserId])


    return (
        <>
            {invitedUsers}
        </>
    )
}

export default SearchResults;