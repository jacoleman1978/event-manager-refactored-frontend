import React from "react";

// Called from EventsByWeek.js
const WeekHeader = ({offsetBy}) => {
    // Define titles of day headers
    let dayHeaders = ["People"];
    let date = new Date();
    let day = date.getDate();

    // Generates an array of formatted date strings for the given week
    for (let i = 0; i < 7; i++) {
        let headerDate = new Date(date.getTime())
        headerDate.setDate(day + i + offsetBy * 7);
        dayHeaders.push(headerDate.toLocaleDateString('en-us', { weekday:"short", month:"numeric", day:"numeric"}));
    }

    // Displays the formatted date strings in the header of the week table
    let weekHeaders = dayHeaders.map(header => {
        return (
            <div key={header} className="week-day-header">{header}</div>
        )
    })

    return (
        <div className="week-headers">
            {weekHeaders}
        </div>
    )
}

export default WeekHeader;