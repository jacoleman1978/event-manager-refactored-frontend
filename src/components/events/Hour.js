import React from "react";
import FifteenMin from "./FifteenMin";
import getCurrentEventsTemplateList from "../../helpers/getCurrentEventsTemplateList";
import orderDayCurrentEvents from "../../helpers/orderDayCurrentEvents";

// Called from Day.js
const Hour = ({hour, events, maximumEventsPerHour}) => {
    // An object template for each hour breaking each hour up into 15 minute increments
    let fifteenLabels = [
        {
            label: "zero",
            minutes: "00",
            time: `${hour}:00`
        },
        {
            label: "fifteen",
            minutes: "15",
            time: ":15"
        },
        {
            label: "thirty",
            minutes: "30",
            time: ":30"
        },
        {
            label: "forty-five",
            minutes: "45",
            time: ":45"
        },
    ]

    let tempEvents = [];

    // Checks the start and end time for timed events, displaying the event duing the time increment
    let fifteens = fifteenLabels.map((fifteen) => {
        let timeRangeEvents = [];
        let previousEvents = [...tempEvents];

        for (let event of events) {
            let startTimeSplit = event.allDay.startTime.split(":");
            let startTimeHour = parseInt(startTimeSplit[0]);
            let startTimeMinutes = parseInt(startTimeSplit[1]);
            let endTimeSplit = event.allDay.endTime.split(":");
            let endTimeHour = parseInt(endTimeSplit[0]);
            let endTimeMinutes = parseInt(endTimeSplit[1]);

            let labelMinutes = parseInt(fifteen.minutes);

            if (hour === startTimeHour) {
                if (startTimeHour !== endTimeHour) {
                    if (labelMinutes >= startTimeMinutes) {
                        timeRangeEvents = [...timeRangeEvents, event];
                    } else if (startTimeMinutes > labelMinutes) {
                        timeRangeEvents = [...timeRangeEvents, event];
                    }
                    
                } else if (startTimeHour === endTimeHour) {
                    if (startTimeMinutes >= labelMinutes && startTimeMinutes < labelMinutes + 15) {
                        timeRangeEvents = [...timeRangeEvents, event];
                    } else if (startTimeMinutes <= labelMinutes && endTimeMinutes > labelMinutes) {
                        timeRangeEvents = [...timeRangeEvents, event];
                    }
                }
            } else if (hour > startTimeHour && hour < endTimeHour) {
                timeRangeEvents = [...timeRangeEvents, event];
            } else if (hour === endTimeHour) {
                if (endTimeMinutes > labelMinutes) {
                    timeRangeEvents = [...timeRangeEvents, event];
                }
            }
        }

        let currentEvents = getCurrentEventsTemplateList(maximumEventsPerHour);

        currentEvents = orderDayCurrentEvents(timeRangeEvents, previousEvents, currentEvents);

        tempEvents = [...currentEvents];

        return (
            <FifteenMin key={`${hour}:${fifteen.minutes}`} hour={hour} fifteenLabel={fifteen} currentEvents={currentEvents} maximumEventsPerHour={maximumEventsPerHour}/>
        )
    })

    return (
        <div id={`${hour}-hour`} key={`${hour}-hour`} className="hour-grid">
            {fifteens}
        </div>
    )
}

export default Hour;