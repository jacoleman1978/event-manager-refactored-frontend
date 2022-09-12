// Called by /groups/GroupInvitations.js, /groups/InvitedList.js, /groups/UsersList.js
// Returns full user name from a user doc from the database
const getFullUserName = (userDoc) => {
    return `${userDoc.firstName} ${userDoc.lastName}`
}

export default getFullUserName;