// Called by TasksByPriority.js
/*
-tasks is an array of task objects
-Returns an object with properties of the priorities: critical, high, medium, low
-Each of properties is an object with the header string, color and an array of the sorted tasks
*/
const sortTasksByPriority = (tasks) => {
    // Collect all of the tasks sorted by priority into an array
    let taskPriorities = {
        critical: {
            header: 'Critical: Do this task and ignore everything else!',
            headerColor: 'lightcoral',
            sortedTasks: []
        },
        high: {
            header: 'High: Needs to be completed soon',
            headerColor: 'lightsalmon',
            sortedTasks: []
        },
        medium: {
            header: 'Medium: No rush to be completed',
            headerColor: 'lightyellow',
            sortedTasks: []
        },
        low: {
            header: 'Low: Just a reminder for now',
            headerColor: 'lightblue',
            sortedTasks: []
        }
    }

    // Puts a task into the appropriate array based on the priority of the task
    const sortByPriority = (task) => {
        let priority = task.task.priority;

        if (priority === "Critical") {
            taskPriorities.critical.sortedTasks.push(task);
        } else if (priority === "High") {
            taskPriorities.high.sortedTasks.push(task);
        } else if (priority === "Medium") {
            taskPriorities.medium.sortedTasks.push(task);
        } else if (priority === "Low") {
            taskPriorities.low.sortedTasks.push(task);
        }
    }

    // Sort all of the tasks
    for (let task of tasks) {
        sortByPriority(task);
    }

    return taskPriorities
}

export default sortTasksByPriority;