import React from "react";
import TaskGroup from "./TaskGroup";
import NewSimpleTask from "./NewSimpleTask";
import getDayDifference from "../../helpers/getDayDifference";

// Called by Tasks.js
const TasksByDueDate = (props) => {
    let {settings, tasks} = props;

    // Arrays to hold tasks with different due dates
    let pastTasks = [];
    let todayTasks = [];
    let tomorrowTasks = [];
    let thisWeekTasks = [];
    let futureTasks = [];

    // Puts a task into the appropriate array based on the priority of the task
    const sortByDate = (task) => {
        // Find the difference in ms between today and the dueDate
        let daysUntilDue = getDayDifference(task.allDay.endDate)

        if (daysUntilDue < 0) {
            pastTasks.push(task);
        } else if (daysUntilDue === 0) {
            todayTasks.push(task);
        } else if (daysUntilDue === 1) {
            tomorrowTasks.push(task);
        } else if (daysUntilDue <= 7) {
            thisWeekTasks.push(task);
        } else {
            futureTasks.push(task);
        }
    }
    
    // Iterating through all of the tasks and using the sorting function
    for (let task of tasks) {
        sortByDate(task);
    }

    // Creating an array of arrays, where each inner array represents a specific dueDate category
    let collectedTasks = [
        {
            header: 'Past Due',
            headerColor: 'red',
            sortedTasks: pastTasks
        },
        {
            header: 'Due Today',
            headerColor: 'orange',
            sortedTasks: todayTasks
        },
        {
            header: 'Due Tomorrow',
            headerColor: 'yellow',
            sortedTasks: tomorrowTasks
        },
        {
            header: 'Due Within the Next 7 Days',
            headerColor: 'lightblue',
            sortedTasks: thisWeekTasks
        },
        {
            header: 'Future Due Dates',
            headerColor: 'lightgray',
            sortedTasks: futureTasks
        },
    ]
    
    let displayTasks = collectedTasks.map((taskGroup, index) => {
        return (
            <TaskGroup key={index} tasks={taskGroup} />
        )
    })

    return (
        <div>
            {displayTasks}
            <NewSimpleTask settings={settings}/>
        </div>
    )
}

export default TasksByDueDate;