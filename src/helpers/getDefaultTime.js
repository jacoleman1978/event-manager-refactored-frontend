import zeroBeforeSingleDigitInt from "./zeroBeforeSingleDigitInt";
// Called by /events/EventForm.js
// Used to convert time defaults in settings to format usable by time input fields.
// Input is "+15 Minutes", "+30 Minutes", "+45 Minutes", "+1 Hour", "+2 Hours", "+3 Hours", "+4 Hours", "+5 Hours", "+6 Hours"
// Time will be returned as a string 'HH:MM'.
const getDefaultTime = (timeOption) => {
    let date = new Date();
    let minutes = date.getMinutes();
    let hours = date.getHours();

    if (timeOption === "Now") {
        return `${zeroBeforeSingleDigitInt(hours)}:${zeroBeforeSingleDigitInt(minutes)}`
    }

    let timeOptionSplit = timeOption.split(" ");

    if (timeOptionSplit[1] === "Minutes") {
        date.setMinutes(minutes + parseInt(timeOptionSplit[0]));
        hours = date.getHours();
        minutes = date.getMinutes();

    } else if (timeOptionSplit[1].indexOf("Hour") > -1) {
        date.setHours(hours + parseInt(timeOptionSplit[0]));
        hours = date.getHours();
    }
    
    return `${zeroBeforeSingleDigitInt(hours)}:${zeroBeforeSingleDigitInt(minutes)}`
}

export default getDefaultTime;
