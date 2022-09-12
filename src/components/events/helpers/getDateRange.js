import getDisplayDate from "./getDisplayDate";

// Called by /events/EventsByDay.js, /events/EventsByWeek.js
const getDateRange = (viewType, offsetBy) => {
    let date = new Date();
    let day = date.getDate();
    let dateRange = {
        startDate: "",
        endDate: ""
    };

    if (viewType === 'day') {
        date.setDate(day + parseInt(offsetBy));

        dateRange.startDate = getDisplayDate(date);
        dateRange.endDate = getDisplayDate(date)
        
    } else if (viewType === 'week' || viewType === 'list') {
        date.setDate(day + offsetBy * 7);
        dateRange.startDate = getDisplayDate(date);
        day = date.getDate();

        date.setDate(day + 6);
        dateRange.endDate = getDisplayDate(date);
    }

    return dateRange
}

export default getDateRange;