import getDayDifference from "../../../helpers/getDayDifference";
import isEndTimeValid from "./isEndTimeValid";

//Called by EventForm.js
/*
-startDate and endDate passed in as 'YYYY-MM-DD'
-startTime and endTime in 24hour format
-Returns true if the end date-time is after the start date-time, otherwise returns false
*/
const isDateTimeValid = (startDate, endDate, startTime, endTime) => {
    let startDateOffset = getDayDifference(startDate);
    let endDateOffset = getDayDifference(endDate);

    if (endDateOffset - startDateOffset > 0) {
        return true
    } else if (endDateOffset === startDateOffset && isEndTimeValid(startTime, endTime)) {
        return true
    }else {
        return false
    }
}

export default isDateTimeValid;