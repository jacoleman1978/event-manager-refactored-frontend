import React, { useState, useEffect } from "react";
import TaskGroup from "./TaskGroup";
import NewSimpleTask from "./NewSimpleTask";
import CompletedTasks from "./CompletedTasks";
import sortTasksByPriority from "./helpers/sortTasksByPriority";

// Called by Tasks.js
const TasksByPriority = ({settings, tasks}) => {
    let [displayTasks, setDisplayTasks] = useState([]);

    useEffect(() => {
        // If there are tasks, sort them and set TaskGroup component for each priority
        let sortedTasksDisplay = [];
        
        let taskPriorities = sortTasksByPriority(tasks);

        for (let taskPriorityGroup in taskPriorities) {
            sortedTasksDisplay = [...sortedTasksDisplay, <TaskGroup key={taskPriorityGroup} tasks={taskPriorities[taskPriorityGroup]} />]
        }

        setDisplayTasks(sortedTasksDisplay);
    }, [tasks])
    
    return (
        <>
            {displayTasks}
            <NewSimpleTask settings={settings} />
            <CompletedTasks />
        </>
    )
}

export default TasksByPriority;