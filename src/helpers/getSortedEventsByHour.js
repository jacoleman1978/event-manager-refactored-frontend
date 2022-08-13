const getSortedEventsByHour = (timeRangeEvents) => {
    let eventsByHour = [];

    for (let i = 0; i < 24; i++) {
        eventsByHour = [...eventsByHour, {hour: i, events: []}];
    }

    eventsByHour.forEach((hourGroup, index) => {
        let hour = hourGroup.hour;

        for (let event of timeRangeEvents) {
            let eventStartSplit = event.allDay.startTime.split(":");
            let eventStartHour = parseInt(eventStartSplit[0]);
            let eventEndSplit = event.allDay.endTime.split(":");
            let eventEndHour = parseInt(eventEndSplit[0]);
            let eventEndMinutes = parseInt(eventEndSplit[1]);
            
            if (hour >= eventStartHour && hour <= eventEndHour) {
                if (hour < eventEndHour) {
                    eventsByHour[index].events = [...eventsByHour[index].events, event];
                } else if (hour === eventEndHour && eventEndMinutes > 0) {
                    eventsByHour[index].events = [...eventsByHour[index].events, event];
                }
            }
        }
    })

    return eventsByHour
}

export default getSortedEventsByHour;