const getFirstBlankPosition = (events) => {
    let firstBlankPosition = -1;
 
    let counter = 0

    for (let event of events) {
        let splitId = event._id.split("-");
        
        if (splitId[0] === "None") {
            firstBlankPosition = counter;
            console.log(firstBlankPosition)
            return firstBlankPosition
        }

        counter += 1;
    }
}

export default getFirstBlankPosition;