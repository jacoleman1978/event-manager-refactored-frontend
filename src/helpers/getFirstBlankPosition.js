const getFirstBlankPosition = (events) => {
    let firstBlankPosition = -1;

    events.forEach((event, index) => {
        if (event._id === "None") {
            firstBlankPosition = index;
        }
    })

    return firstBlankPosition
}

export default getFirstBlankPosition;