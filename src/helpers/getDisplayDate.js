import zeroBeforeSingleDigitInt from "./zeroBeforeSingleDigitInt";

const getDisplayDate = (date) => {
    let year = date.getFullYear().toString();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // Convert month to two characters if not already
    month = zeroBeforeSingleDigitInt(month);

    // Convert day to two characters if not already
    day = zeroBeforeSingleDigitInt(day);

    return `${year}-${month}-${day}`
}

export default getDisplayDate;