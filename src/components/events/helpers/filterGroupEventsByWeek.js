import getSortedEventsByWeek from "./getSortedEventsByWeek";
/*
-Called by /events/EventsByWeek.js
-groupEvents is and object with userIds as keys: {userId: {events: [], userName, fullName, userId}}
-date range is and object: {startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD'}
-Returns an object similar to events, except for each group the events property has been split into 7 arrays representing days in the dateRange
*/
const filterGroupEventsByWeek = (groupEvents, dateRange) => {
    let sortedEvents = {};

    for (let group in groupEvents) {
        let events = groupEvents[group];
        let groupWeeklyEvents = getSortedEventsByWeek(events, dateRange);
        let areEventsPresent = false;
        for (let dayEvents of groupWeeklyEvents) {
            if (dayEvents.length > 0) {
                areEventsPresent = true;
            }
        }

        if (areEventsPresent) {
            sortedEvents[group] = {
                events: groupWeeklyEvents,
                fullName: groupEvents[group].groupName,
                groupId: groupEvents[group].groupId
            }
        } 
    }

    return sortedEvents
}

export default filterGroupEventsByWeek;