//Called by /events/helpers/isDateTimeValid.js
/*
-IMPORTANT: Only used if the start and end date are the same
-startTime and endTime in 24hour format
-Returns true if the end time is after the start time, otherwise returns false
*/
const isEndTimeValid = (startTime, endTime) => {
    let splitStartTime = startTime.split(":");
    let splitEndTime = endTime.split(":");

    if (splitEndTime[0] > splitStartTime[0]) {
        return true
    } else if (splitEndTime[0] === splitStartTime[0]) {
        if (splitEndTime[1] > splitStartTime[1]) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

export default isEndTimeValid;