import React, { useState, useEffect } from "react";
import TaskGroup from "./TaskGroup";
import NewSimpleTask from "./NewSimpleTask";
import CompletedTasks from "./CompletedTasks";
import sortTasksByDueDate from "./helpers/sortTasksByDueDate";

// Called by Tasks.js
const TasksByDueDate = ({settings, tasks}) => {
    let [displayTasks, setDisplayTasks] = useState([]);

    useEffect(() => {
        // If there are tasks, sort them and set TaskGroup component for each due date
        if (tasks.length > 0) {
            let sortedTasksDisplay = [];
            
            let taskDueDates = sortTasksByDueDate(tasks);

            for (let taskDueDateGroup in taskDueDates) {
                sortedTasksDisplay = [...sortedTasksDisplay, <TaskGroup key={taskDueDateGroup} tasks={taskDueDates[taskDueDateGroup]} />]
            }
    
            setDisplayTasks(sortedTasksDisplay);
        } 
    }, [tasks])

    return (
        <div>
            {displayTasks}
            <NewSimpleTask settings={settings}/>
            <CompletedTasks />
        </div>
    )
}

export default TasksByDueDate;