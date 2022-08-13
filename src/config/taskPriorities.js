let taskPriorities = {
    critical: {
        label: "Critical",
        header: "Critical: Do this task and ignore everything else!",
        headerColor: "red",
        sortedTasks: []
    },
    high: {
        label: "High",
        header: "High: Needs to be completed soon",
        headerColor: "orange",
        sortedTasks: []
    },
    medium: {
        label: "Medium",
        header: "Medium: No rush to be completed",
        headerColor: "yellow",
        sortedTasks: []
    },
    low: {
        label: "Low",
        header: "Low: Just a reminder for now",
        headerColor: "lightblue",
        sortedTasks: []
    }
}

export default taskPriorities;