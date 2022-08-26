import GroupDataService from "../../../services/groupDataService";

// Updates the Group database document, if needed
const updateGroup = (groupId, formGroupName, originalGroupName, changedPermissionList, usersToRemoveList) => {
    let data = {
        groupId: groupId,
        groupName: formGroupName,
        userIdPrivChange: "",
        newEditPrivilege: "",
        removedUserId: "",
    }

    if (data.groupName !== originalGroupName) {
        GroupDataService.ChangeGroupName(data);
    }

    if (changedPermissionList.length > 0) {
        for (let userData of changedPermissionList) {
            data.userIdPrivChange = userData[0];
            data.newEditPrivilege = userData[1];

            GroupDataService.ChangeEditPrivilege(data);
        }
    }

    if (usersToRemoveList.length > 0) {
        let filteredToRemoveList = new Set([...usersToRemoveList])

        for (let removedUserId of filteredToRemoveList) {
            data.removedUserId = removedUserId;

            GroupDataService.RemoveGroupMember(data);
        }
    }
}

export default updateGroup;