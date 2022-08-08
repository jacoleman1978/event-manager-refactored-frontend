import zeroBeforeSingleDigitInt from "./zeroBeforeSingleDigitInt";

// Used to convert date defaults in settings to format usable by date input fields.
// Input is "Today", "Tomorrow", "Next Week".
// Date will be returned as a string 'YYYY-MM-DD'.
const getDefaultDate = (dateOption) => {
    let date = new Date();
    let day = date.getDate();

    if (dateOption === 'Tomorrow') {
        date.setDate(day + 1);
        day = date.getDate();
    } else if (dateOption === 'Next Week') {
        date.setDate(day + 7);
        day = date.getDate();
    }

    let year = date.getFullYear().toString();
    let month = date.getMonth() + 1;
    
    // Convert month to two characters if not already
    month = zeroBeforeSingleDigitInt(month);

    // Convert day to two characters if not already
    day = zeroBeforeSingleDigitInt(day);

    return `${year}-${month}-${day}`
}

export default getDefaultDate;
