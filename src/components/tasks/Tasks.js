import React, { useState, useEffect } from "react";
import EventDataService from "../../services/eventDataService";
import TasksByDueDate from "./TasksByDueDate";
import TasksByPriority from "./TasksByPriority";
import TaskForm from "./TaskForm";

// Called from DisplayContainer.js
const Tasks = ({viewType, settings}) => {
    let [tasks, setTasks] = useState([]);

    // Retrieve all of the tasks for the the user and set them to state
    useEffect(() => {
        EventDataService.GetTasks().then((res) => {
            setTasks(res.data.tasks);
        })
    }, [])

    // Select the task view to display depending on the viewType
    const selectTaskView = (viewType) => {
        if (viewType === 'priority') {
            return <TasksByPriority settings={settings} tasks={tasks}/>
        } else if (viewType === 'duedate') {
            return <TasksByDueDate settings={settings} tasks={tasks}/>
        } else if (viewType === 'new') {
            return <TaskForm settings={settings} isEdit={false} restoreTask={false} />
        } else if (viewType === 'edit') {
            return <TaskForm settings={settings} isEdit={true} restoreTask={false} />
        } else if (viewType === 'restore') {
            return <TaskForm settings={settings} isEdit={true} restoreTask={true} />
        }
    }

    return (
        <>
            {selectTaskView(viewType)}
        </>
    )
}

export default Tasks;