// Called by /groups/EditGroup.js
/*
-Used to return a list of userIds of members to remove from the group.
-Adds users list, if their permissionChange.addId contains a userId.
-Removes users from the list, if their permissionChange.removeId contains a userId.
*/
const updateMemberChange = (action, changeList) => {
    let tempChangeList = [...changeList];

    if (action.addId.length > 0) {
        tempChangeList.push(action.addId);

    } else if (action.removeId.length > 0) {
        for (let i = 0; i < changeList.length; i ++) {
            if (changeList[i][0] === action.removeId[0]) {
                tempChangeList.splice(i, 1)
            }
        }
    }

    return tempChangeList
}

export default updateMemberChange;