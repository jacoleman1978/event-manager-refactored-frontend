import getDefaultDate from "./getDefaultDate";

// Called from /events/helpers/getSortedEventsByWeek.js, /events/helpers/isEventWithinDateRange.js, /tasks/helpers/sorTasksByDueDate.js
const getDayDifference = (date) => {
    // Need a date object in the format of 'YYYY-MM-DD'.
    const todayDate = getDefaultDate("Now");
    let todayDateArr =  todayDate.split('-');
    let today = new Date(parseInt(todayDateArr[0]), parseInt(todayDateArr[1] -1), parseInt(todayDateArr[2]));

    // Calculate the number of milliseconds(ms) in one day
    const msInOneDay = 1000 * 60 * 60 * 24;

    // Need a date object in the format of 'YYYY-MM-DD'.
    let dateArr =  date.split('-')
    let dateObject = new Date(parseInt(dateArr[0]), parseInt(dateArr[1] -1), parseInt(dateArr[2]));

    // Find the difference in ms between today and the dueDate
    return (dateObject.getTime() - today.getTime()) / msInOneDay;
}

export default getDayDifference;