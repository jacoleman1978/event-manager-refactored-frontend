import getDayDifference from "./getDayDifference";

const getSortedEventsByWeek = (events) => {

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
        let daysUntilDue = getDayDifference(event.allDay.endDate);

        if (daysUntilStart <= 0 && daysUntilDue >= 0) {
            eventsPlusZero.push(event);
        } 
        
        if (daysUntilStart <= 1 && daysUntilDue >= 1) {
            eventsPlusOne.push(event);
        } 
        
        if (daysUntilStart <= 2 && daysUntilDue >= 2) {
            eventsPlusTwo.push(event);
        } 
        
        if (daysUntilStart <= 3 && daysUntilDue >= 3) {
            eventsPlusThree.push(event);
        } 
        
        if (daysUntilStart <= 4 && daysUntilDue >= 4) {
            eventsPlusFour.push(event);
        } 
        
        if (daysUntilStart <= 5 && daysUntilDue >= 5) {
            eventsPlusFive.push(event);
        } 
        
        if (daysUntilStart <= 6 && daysUntilDue >= 6) {
            eventsPlusSix.push(event);
        }
    }

    for (let event of events.events) {
        sortByDay(event);
    }

    return [eventsPlusZero, eventsPlusOne, eventsPlusTwo, eventsPlusThree, eventsPlusFour, eventsPlusFive, eventsPlusSix]
}

export default getSortedEventsByWeek;