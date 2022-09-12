/*
-Called by /events/UsersWithCommonEvents.js ...Unused
-dvents is and object with userIds as keys: {userId: {events: [], userName, fullName, userId}}
-Returns an object similar to events, but added userId, userName, and fullName properties for each user
*/
const formatUserList = (events, currentUserId) => {
    let formattedUserList = [];

    for (let user in events) {
        if (events[user].userId !== currentUserId) {
            formattedUserList = [
                ...formattedUserList, 
                {
                    userId: events[user].userId,
                    userName: events[user].userName,
                    fullName: events[user].fullName
                }
            ]
        }
    }

    return formattedUserList
}

export default formatUserList;