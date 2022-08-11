import React, { useState, useEffect } from "react";
import EventDataService from "../../services/eventDataService";
import TasksByDueDate from "./TasksByDueDate";
import TasksByPriority from "./TasksByPriority";
import TaskForm from "./TaskForm";

// Called from DisplayContainer.js
const Tasks = (props) => {
    let {viewType, settings} = props;

    // State used to ensure other components won't be rendered until tasks retrieved
    let [tasks, setTasks] = useState([]);
    let [tasksLoaded, setTasksLoaded] = useState(false);

    useEffect(() => {
        if (tasksLoaded === false) {
            // If tasks haven't been fetched, retrieve them
            if (tasks.length === 0) {
                EventDataService.GetTasks().then((res) => {
                    setTasks(res.data.tasks);
                })
            }

            // Tasks have been fetched, so set the flag
            if (tasks.length > 0) {
                setTasksLoaded(true);
            }
        }

    }, [tasks])

    // Select the view to display depending on the viewType
    const selectTaskView = (viewType) => {
        if (tasksLoaded) {
            if (viewType === 'priority') {
                return <TasksByPriority settings={settings} tasks={tasks}/>
            } else if (viewType === 'duedate') {
                return <TasksByDueDate settings={settings} tasks={tasks}/>
            } else if (viewType === 'new') {
                return <TaskForm settings={settings} isEdit={false}/>
            } else if (viewType === 'edit') {
                return <TaskForm settings={settings} isEdit={true}/>
            }
        }
    }

    // Display the selected view
    return (
        <>
            {selectTaskView(viewType)}
        </>
    )

}

export default Tasks;