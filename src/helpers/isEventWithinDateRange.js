import getDayDifference from "./getDayDifference";

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