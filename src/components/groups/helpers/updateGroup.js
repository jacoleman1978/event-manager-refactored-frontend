import GroupDataService from "../../../services/groupDataService";

// Called from /groups/EditGroup.js
// Updates the Group database document, if needed
const updateGroup = (groupId, formGroupName, originalGroupName, changedPermissionList, usersToRemoveList) => {
    let data = {
        groupId: groupId,
        groupName: formGroupName,
        userIdPrivChange: "",
        newEditPrivilege: "",
        removedUserId: "",
    }

    // If the Group name has changed, update it
    if (data.groupName !== originalGroupName) {
        GroupDataService.ChangeGroupName(data);
    }

    // If the a user's permission has been changed, update it
    if (changedPermissionList.length > 0) {
        for (let userData of changedPermissionList) {
            data.userIdPrivChange = userData[0];
            data.newEditPrivilege = userData[1];

            GroupDataService.ChangeEditPrivilege(data);
        }
    }

    // If the "Remove" checkbox has been checked, remove the user from the Group
    if (usersToRemoveList.length > 0) {
        let filteredToRemoveList = new Set([...usersToRemoveList])

        for (let removedUserId of filteredToRemoveList) {
            data.removedUserId = removedUserId;

            GroupDataService.RemoveGroupMember(data);
        }
    }
}

export default updateGroup;