import isEventWithinDateRange from "./isEventWithinDateRange";

const getSortedEventsByUser = (dateRange, events, currentUser) => {
    if (events.length === 0) {
        return {}
    }

    let eventsByUser = {}
    eventsByUser[currentUser.userId] = {events: [], userName: currentUser.userName, fullName: currentUser.fullName, userId: currentUser.userId};

    for (let event of events) {
        let users = [];

        if (isEventWithinDateRange(dateRange, event.allDay.startDate, event.allDay.endDate)) {
            users = [...users, ...event.editorIds, ...event.viewerIds, event.ownerId];

            for (let user of users) {
                let userId = user._id.toString()
                if (userId in eventsByUser) {
                    let isEventPresent = false;

                    let userEvents = [...eventsByUser[userId]["events"]];

                    for(let listedEvent of userEvents) {
                        if (event._id === listedEvent._id) {
                            isEventPresent = true;
                        }
                    }

                    if (isEventPresent === false) {
                        eventsByUser[userId]["events"].push(event)
                    }
                    
                } else {
                    eventsByUser[userId] = {};
                    eventsByUser[userId]["events"] = [event];
                    eventsByUser[userId]["userName"] = user.userName;
                    eventsByUser[userId]["fullName"] = `${user.firstName} ${user.lastName}`;
                    eventsByUser[userId]["userId"] = userId;
                }
            }

        }
    }

    return eventsByUser
}

export default getSortedEventsByUser;