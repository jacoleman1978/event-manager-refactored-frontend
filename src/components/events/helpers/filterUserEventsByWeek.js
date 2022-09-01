import getSortedEventsByWeek from "../../../helpers/getSortedEventsByWeek";
/*
-events is and object with userIds as keys: {userId: {events: [], userName, fullName, userId}}
-date range is and object: {startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD'}
-Returns an object similar to events, except the events property has been split into 7 arrays representing days in the dateRange
*/
const filterUserEventsByWeek = (events, dateRange, currentUser) => {
    let sortedEvents = {};

    for (let user in events) {
        let userEvents = events[user];
        let userWeeklyEvents = getSortedEventsByWeek(userEvents, dateRange);
        let areEventsPresent = false;
        for (let dayEvents of userWeeklyEvents) {
            if (dayEvents.length > 0) {
                areEventsPresent = true;
            }
        }

        if (areEventsPresent) {
            sortedEvents[user] = {
                events: userWeeklyEvents,
                userName: events[user].userName,
                fullName: events[user].fullName,
                userId: events[user].userId
            }
        } else {
            sortedEvents[user] = {
                events: userWeeklyEvents,
                userName: currentUser.userName,
                fullName: currentUser.fullName,
                userId: currentUser.userId
            };
        }
    }

    return sortedEvents
}

export default filterUserEventsByWeek;