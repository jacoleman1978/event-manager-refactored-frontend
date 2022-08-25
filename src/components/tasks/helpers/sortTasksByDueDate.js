import getDayDifference from "../../../helpers/getDayDifference"

/*
-tasks is an array of task objects
-Returns an object with properties of the due dates: past, today, tomorrow, week, future
-Each of properties is an object with the header string, color and an array of the sorted tasks
*/
const sortTasksByDueDate = (tasks) => {
    // Collect all of the tasks sorted by due date into an array
    let taskDueDates = {
        past: {
            header: 'Past Due',
            headerColor: 'red',
            sortedTasks: []
        },
        today: {
            header: 'Due Today',
            headerColor: 'orange',
            sortedTasks: []
        },
        tomorrow: {
            header: 'Due Tomorrow',
            headerColor: 'yellow',
            sortedTasks: []
        },
        week: {
            header: 'Due Within the Next 7 Days',
            headerColor: 'lightblue',
            sortedTasks: []
        },
        future: {
            header: 'Future Due Dates',
            headerColor: 'lightgray',
            sortedTasks: []
        }
    }

    // Puts a task into the appropriate array based on the due date of the task
    const sortByDueDate = (task) => {
        // Find the difference in ms between today and the dueDate
        let daysUntilDue = getDayDifference(task.allDay.endDate)

        if (daysUntilDue < 0) {
            taskDueDates.past.sortedTasks.push(task);
        } else if (daysUntilDue === 0) {
            taskDueDates.today.sortedTasks.push(task);
        } else if (daysUntilDue === 1) {
            taskDueDates.tomorrow.sortedTasks.push(task);
        } else if (daysUntilDue <= 7) {
            taskDueDates.week.sortedTasks.push(task);
        } else if (daysUntilDue > 7) {
            taskDueDates.future.sortedTasks.push(task);
        }
    }

    // Sort all of the tasks
    for (let task of tasks) {
        sortByDueDate(task);
    }

    return taskDueDates
}

export default sortTasksByDueDate;