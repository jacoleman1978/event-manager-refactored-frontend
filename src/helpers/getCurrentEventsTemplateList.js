const getCurrentEventsTemplateList = (maximumEventsPerHour) => {
    let currentEvents = [];

    for (let i = 0; i < maximumEventsPerHour; i++) {
        let blankEvent = {
            _id: `None-${i}`,
            title: ""
        }

        currentEvents = [...currentEvents, blankEvent];
    } 

    return currentEvents
}

export default getCurrentEventsTemplateList;