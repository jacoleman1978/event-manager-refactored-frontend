import React from "react";
import getFullUserName from "./helpers/getFullUserName";

// Called from GroupMembership.js
// Display the passed in header along with passed in users' full names
const UsersList = ({userHeader, userDocs}) => {
    let users = userDocs.map((userDoc) => {
        return (
            <li key={userDoc._id} className="list-items">
                {getFullUserName(userDoc)}
            </li>
        )
    })

    return (
        <>
            <div className="flex-left-bold">{userHeader}:</div>
            <ul>
                {users.length > 0 ? users : <li key={"None"} className="list-items">
                None
            </li>}
            </ul>
        </>
    )
}

export default UsersList;