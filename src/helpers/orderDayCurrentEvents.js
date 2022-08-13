import getFirstBlankPosition from "./getFirstBlankPosition";

const orderDayCurrentEvents = (events, previousEvents, currentEvents) => {
    let previousLength = previousEvents.length;

    // No special formatting if the previous time entry did not have events listed
    if (previousLength === 0) {
        return events
    }

    events.forEach((event, index) => {
        let wasFound = false;

        // For each event, find if the event was listed in the previous time slot
        previousEvents.forEach((previousEvent, previousIndex) => {
            // The event was found in the previous time slot
            if (event._id === previousEvent._id) {
                // The event is already in the same position as the previous time slot
                if (index === previousIndex) {
                    // Put the event in the currentEvents spot at the same index, if one hasn't already been placed there
                    let splitId = currentEvents[index]._id.split("-");

                    if (splitId[0] === "None") {
                        currentEvents[index] = event;
                        wasFound = true;

                    // Look for the first blank spot in current events
                    } else {
                        let firstBlankPosition = getFirstBlankPosition(currentEvents);

                        // If a blank spot was found, move the data to the blank spot and put the event into the same position it was in for the previous time slot
                        if (firstBlankPosition > -1) {
                            currentEvents[firstBlankPosition] = currentEvents[index];
                            currentEvents[index] = event;
                            wasFound = true;
                        }
                    }

                } else {
                    currentEvents[previousIndex] = event;
                    wasFound = true;
                }
            } 
        })

        if (wasFound === false) {
            let firstBlankPosition = getFirstBlankPosition(currentEvents);

            currentEvents[firstBlankPosition] = event;
        } 
    })
    
    return currentEvents
}

export default orderDayCurrentEvents;