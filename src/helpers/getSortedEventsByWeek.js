import getDayDifference from "./getDayDifference";

const getSortedEventsByWeek = (events, dateRange) => {

    // Create arrays to hold events for up to a week total
    let eventsPlusZero = [];
    let eventsPlusOne = [];
    let eventsPlusTwo = [];
    let eventsPlusThree = [];
    let eventsPlusFour = [];
    let eventsPlusFive = [];
    let eventsPlusSix = [];

    // Sort events by day of week and pushes them to the appropriate array
    const sortByDay = (event) => {
        let daysUntilStart = getDayDifference(event.allDay.startDate);
        let daysUntilEnd = getDayDifference(event.allDay.endDate);
        let rangeStartDate = parseInt(getDayDifference(dateRange.startDate));

        if (daysUntilStart <= rangeStartDate && daysUntilEnd >= rangeStartDate) {
            eventsPlusZero.push(event);
        } 
        
        if (daysUntilStart <= rangeStartDate + 1 && daysUntilEnd >= rangeStartDate + 1) {
            eventsPlusOne.push(event);
        } 
        
        if (daysUntilStart <= rangeStartDate + 2 && daysUntilEnd >= rangeStartDate + 2) {
            eventsPlusTwo.push(event);
        } 
        
        if (daysUntilStart <= rangeStartDate + 3 && daysUntilEnd >= rangeStartDate + 3) {
            eventsPlusThree.push(event);
        } 
        
        if (daysUntilStart <= rangeStartDate + 4 && daysUntilEnd >= rangeStartDate + 4) {
            eventsPlusFour.push(event);
        } 
        
        if (daysUntilStart <= rangeStartDate + 5 && daysUntilEnd >= rangeStartDate + 5) {
            eventsPlusFive.push(event);
        } 
        
        if (daysUntilStart <= rangeStartDate + 6 && daysUntilEnd >= rangeStartDate + 6) {
            eventsPlusSix.push(event);
        }
    }

    for (let event of events.events) {
        sortByDay(event);
    }

    return [eventsPlusZero, eventsPlusOne, eventsPlusTwo, eventsPlusThree, eventsPlusFour, eventsPlusFive, eventsPlusSix]
}

export default getSortedEventsByWeek;