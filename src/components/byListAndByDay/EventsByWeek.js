import React from "react";
import WeekHeader from "./WeekHeader";
import WeekGroup from "./WeekGroup";

const EventsByWeek = (props) => {
    let {events} = props;

    let weekEventList = [[{title: "User's Name"}]];
    weekEventList = [...weekEventList, ...events]

    let weekEvents = weekEventList.map((dayEvents, index) => {
        return (
            <div key={index} className="week-day">
                <WeekGroup key={index} events={dayEvents} />
            </div>
        )
    })

    return (
        <>
            <WeekHeader />
            <div className="week-row">
                {weekEvents}
            </div>
        </>
    )
}

export default EventsByWeek;