// Converts an int to a string and returns the string as at least two characters
const zeroBeforeSingleDigitInt = (intToConvert) => {
    if (intToConvert < 10) {
        return `0${intToConvert}`
    } else {
        return intToConvert.toString()
    }
}

export default zeroBeforeSingleDigitInt;