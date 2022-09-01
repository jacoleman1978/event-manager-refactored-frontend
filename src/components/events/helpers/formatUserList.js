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