import getDayDifference from "../../../helpers/getDayDifference";

// Called by /helpers/getSortedEventsByUser.js
const isEventWithinDateRange = (dateRange, eventStart, eventEnd) => {
    let dateRangeStartDiff = getDayDifference(dateRange.startDate);
    let dateRangeEndDiff = getDayDifference(dateRange.endDate);
    let eventStartDiff = getDayDifference(eventStart);
    let eventEndDiff = getDayDifference(eventEnd);

    if (eventStartDiff <= dateRangeEndDiff && eventEndDiff >= dateRangeStartDiff) {
        return true
    } else {
        return false
    }
}

export default isEventWithinDateRange;