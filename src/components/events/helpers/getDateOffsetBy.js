const getDateOffsetBy = (viewType, params) => {
    let offsetBy = 0;

    if (viewType === 'week' || viewType === 'list') {
        let { week } = params;
        offsetBy = parseInt(week);
    } else if (viewType === 'day') {
        let { day } = params;
        offsetBy = parseInt(day);
    } 

    return offsetBy
}

export default getDateOffsetBy;