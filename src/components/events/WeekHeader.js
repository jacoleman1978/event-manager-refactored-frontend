import React from "react";

// Called from EventsByWeek.js
const WeekHeader = ({offsetBy}) => {
    // Define titles of day headers
    let dayHeaders = [];
    let date = new Date();
    let day = date.getDate();

    // Generates an array of formatted date strings for the given week
    for (let i = 0; i < 7; i++) {
        let headerDate = new Date(date.getTime())
        headerDate.setDate(day + i + offsetBy * 7);
        dayHeaders.push(headerDate.toLocaleDateString('en-us', { weekday:"short", month:"numeric", day:"numeric"}));
    }

    // Displays the formatted date strings in the header of the week table
    let weekHeaders = dayHeaders.map((header, i) => {
        return (
            <div key={i} className="week-day-header">{header}</div>
        )
    })

    return (
        <div className="week-headers">
            <div></div>
            {weekHeaders}
        </div>
    )
}

export default WeekHeader;