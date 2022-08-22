import isEventWithinDateRange from "./isEventWithinDateRange";

const getSortedEventsByUser = (dateRange, events) => {
    if (events.length === 0) {
        return {}
    }
    
    let eventsByUser = {};

    for (let event of events) {
        let users = [];

        if (isEventWithinDateRange(dateRange, event.allDay.startDate, event.allDay.endDate)) {
            users = [...users, ...event.editorIds, ...event.viewerIds, event.ownerId];

            for (let user of users) {
                if (user._id.toString() in eventsByUser) {
                    let isEventPresent = false;

                    let userEvents = [...eventsByUser[user._id.toString()]["events"]];

                    for(let listedEvent of userEvents) {
                        if (event._id === listedEvent._id) {
                            isEventPresent = true;
                        }
                    }

                    if (isEventPresent === false) {
                        eventsByUser[user._id.toString()]["events"].push(event)
                    }
                    
                } else {
                    eventsByUser[user._id.toString()] = {};
                    eventsByUser[user._id.toString()]["events"] = [event];
                    eventsByUser[user._id.toString()]["userName"] = user.userName;
                    eventsByUser[user._id.toString()]["fullName"] = `${user.firstName} ${user.lastName}`;
                }
            }

        }
    }

    return eventsByUser
}

export default getSortedEventsByUser;