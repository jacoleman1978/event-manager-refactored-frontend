import getDefaultDate from "./getDefaultDate";

const getDayDifference = (dueDate) => {
    // Need a date object in the format of 'YYYY-MM-DD'.
    const todayDate = getDefaultDate("Now");
    let todayDateArr =  todayDate.split('-');
    let today = new Date(parseInt(todayDateArr[0]), parseInt(todayDateArr[1] -1), parseInt(todayDateArr[2]));

    // Calculate the number of milliseconds(ms) in one day
    const msInOneDay = 1000 * 60 * 60 * 24;

    // Need a date object in the format of 'YYYY-MM-DD'.
    let dueDateArr =  dueDate.split('-')
    let dueDateObject = new Date(parseInt(dueDateArr[0]), parseInt(dueDateArr[1] -1), parseInt(dueDateArr[2]));

    // Find the difference in ms between today and the dueDate
    return (dueDateObject.getTime() - today.getTime()) / msInOneDay;
}

export default getDayDifference;