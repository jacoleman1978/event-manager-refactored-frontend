import React from "react";
import TaskGroup from "./TaskGroup";
import NewSimpleTask from "./NewSimpleTask";

// Called by Tasks.js
const TasksByPriority = (props) => {
    let {settings, tasks} = props;

    // Arrays to hold tasks of the different priorities
    let criticalTasks = [];
    let highTasks = [];
    let mediumTasks = [];
    let lowTasks = [];

    // Puts a task into the appropriate array based on the priority of the task
    const sortByPriority = (task) => {
        let priority = task.task.priority;

        if (priority === "Critical") {
            criticalTasks.push(task);
        } else if (priority === "High") {
            highTasks.push(task);
        } else if (priority === "Medium") {
            mediumTasks.push(task);
        } else {
            lowTasks.push(task);
        }
    }

    // Sort all of the tasks
    for (let task of tasks) {
        sortByPriority(task);
    }

    // Collect all of the tasks sorted by priority into an array
    let collectedTasks = [
        {
            header: 'Critical: Do this task and ignore everything else!',
            headerColor: 'red',
            sortedTasks: criticalTasks
        },
        {
            header: 'High: Needs to be completed soon',
            headerColor: 'orange',
            sortedTasks: highTasks
        },
        {
            header: 'Medium: No rush to be completed',
            headerColor: 'yellow',
            sortedTasks: mediumTasks
        },
        {
            header: 'Low: Just a reminder for now',
            headerColor: 'lightblue',
            sortedTasks: lowTasks
        }
    ]

    let displayTasks = collectedTasks.map((taskGroup, index) => {
        return (
            <TaskGroup key={index} tasks={taskGroup} />
        )
    })
    
    return (
        <div>
            {displayTasks}
            <NewSimpleTask settings={settings} />
        </div>
    )
}

export default TasksByPriority;