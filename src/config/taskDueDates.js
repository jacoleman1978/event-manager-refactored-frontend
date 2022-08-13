let taskDueDates = {
    past: {
        label: "Past",
        header: "Past Due",
        headerColor: "red", 
        sortedTasks: []
    },
    today: {
        label: "Today",
        header: "Due Today",
        headerColor: "orange",
        sortedTasks: []
    },
    tomorrow: {
        label: "Tomorrow",
        header: "Due Tomorrow",
        headerColor: "yellow",
        sortedTasks: []
    },
    thisWeek: {
        label: "This Week",
        header: "Due Within the Next 7 Days",
        headerColor: "lightblue",
        sortedTasks: []
    },
    future: {
        label: "Future",
        header: "Future Due Dates",
        headerColor: "lightgray",
        sortedTasks: []
    }
}

export default taskDueDates;