/*
-Used to return a list of userIds of members to remove from the group.
-Adds users list, if their checkboxAction.addId contains a userId.
-Removes users from the list, if their checkboxAction.removeId contains a userId.
*/
const updateMembersToRemove = (checkboxAction, usersToRemoveList) => {
    let tempUsersToRemoveList = [...usersToRemoveList];

    if (checkboxAction.addId !== "") {
        tempUsersToRemoveList.push(checkboxAction.addId);

    } else if (checkboxAction.removeId !== "") {
        const index = tempUsersToRemoveList.indexOf(checkboxAction.removeId);
        if (index > -1) { 
            tempUsersToRemoveList.splice(index, 1); 
        }
    }

    return tempUsersToRemoveList
}

export default updateMembersToRemove;