// Called by UserSearch.js
/*
-group is a group document retrieved from the database
-Returns an array of userIds associated with the group
*/
const makeAllGroupMembersArray = (group) => {
    if (group === null) {
        return []
    }
    
    let users = [group.ownerId._id];

    for (let editorDoc of group.editorIds) {
        users.push(editorDoc._id);
    }

    for (let viewerDoc of group.viewerIds) {
        users.push(viewerDoc._id);
    }

    for (let inviteeDoc of group.inviteeIds) {
        users.push(inviteeDoc._id);
    }

    return users
}

export default makeAllGroupMembersArray;