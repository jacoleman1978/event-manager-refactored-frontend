// Called by /groups/EditGroup.js
/*
-Used to return a list of userIds of members to remove from the group.
-Adds users list, if their checkboxAction.addId contains a userId.
-Removes users from the list, if their checkboxAction.removeId contains a userId.
*/
const updateCheckedUsers = (checkboxAction, selectedUsersList) => {
    let tempSelectedUsersList = [...selectedUsersList];

    if (checkboxAction.addId !== "") {
        tempSelectedUsersList.push(checkboxAction.addId);

    } else if (checkboxAction.removeId !== "") {
        const index = tempSelectedUsersList.indexOf(checkboxAction.removeId);
        if (index > -1) { 
            tempSelectedUsersList.splice(index, 1); 
        }
    }

    return tempSelectedUsersList
}

export default updateCheckedUsers;