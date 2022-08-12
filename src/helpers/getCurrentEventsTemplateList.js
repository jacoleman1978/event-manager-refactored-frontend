const getCurrentEventsTemplateList = (eventsLength, previousLength) => {
    let length = Math.max(eventsLength, previousLength);

    let currentEvents = [];

    const blankEvent = {
        _id: "None",
        title: ""
    }

    for (let i = 0; i < length; i++) {
        currentEvents = [...currentEvents, blankEvent];
    } 

    return currentEvents
}

export default getCurrentEventsTemplateList;