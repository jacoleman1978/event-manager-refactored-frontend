// Called from /eventViews/DetailedView.js
const getDisplayDateFormated = (date) => {
    let dateSplit = date.split("-");

    return `${dateSplit[1]}/${dateSplit[2]}/${dateSplit[0]}`

}

export default getDisplayDateFormated;