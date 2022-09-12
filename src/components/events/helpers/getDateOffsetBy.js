/*
-Called by /events/EventsByDay.js, /events/EventsByWeek.js
-viewType is the type of display for the user's events: "week" or "day"
-params is the appropriate url parameter passed in by the url 
--0 represents today or this week
--Positive integers represent how many days or weeks after this current one
--Negative integers represent hown many days or weeks before this current one
-Returns the offsetBy value
*/
const getDateOffsetBy = (viewType, params) => {
    let offsetBy = 0;

    if (viewType === 'week') {
        let { week } = params;
        offsetBy = parseInt(week);
    } else if (viewType === 'day') {
        let { day } = params;
        offsetBy = parseInt(day);
    } 

    return offsetBy
}

export default getDateOffsetBy;