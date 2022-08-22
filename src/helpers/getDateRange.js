import getDisplayDate from "./getDisplayDate";

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

        date.setDate(day + 7);
        dateRange.endDate = getDisplayDate(date);
    }

    return dateRange
}

export default getDateRange;