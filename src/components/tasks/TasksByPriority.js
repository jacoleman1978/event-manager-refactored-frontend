import React, { useState, useEffect } from "react";
import TaskGroup from "./TaskGroup";
import NewSimpleTask from "./NewSimpleTask";
import EventDataService from "../../services/eventDataService";

const TasksByPriority = (props) => {
    // Get props
    let {settings} = props;

    // Use State for data pulled from database
    let [taskData, setTaskData] = useState([]);

    useEffect(() => {
        EventDataService.GetTasks().then(res => {
            setTaskData(res.data.tasks)})
    }, [])

    // Need to fill groupTaskList whether sorting by priority or dueDate
    let groupTasksList =[];
    let criticalTasks = []
    let highTasks = [];
    let mediumTasks = [];
    let lowTasks = [];

    // Function to sort tasks by priority and push them to an array of the same type
    const sortByPriority = (task) => {
        let priority = task.task.priority;

        if (priority === "Critical") {
            criticalTasks.push(task);
        } else if (priority === "High") {
            highTasks.push(task);
        } else if (priority === "Medium") {
            mediumTasks.push(task);
        } else {
            lowTasks.push(task)
        }
    }

    // Iterating through all of the todos and using the sorting function
    for (let task of taskData) {
        sortByPriority(task);
    }

    // Creating an array of arrays, where each inner array represents a specific priority
    let sortedTasks = [criticalTasks, highTasks, mediumTasks, lowTasks];
    
    // Defining the headers to be used when sorting by priority
    const priorityHeaders = [
        'Critical: Do this task and ignore everything else!', 
        'High: Needs to be completed soon', 
        'Medium: No rush to be completed', 
        'Low: Just a reminder for now'
    ];

    // Header background color
    let headerColors = ['red', 'orange', 'yellow', 'lightblue'];

    let data =[];

    // Making a TaskGroup by priority and passing in the header and appropriate data as props
    groupTasksList = priorityHeaders.map((priority, index) => {
        data = sortedTasks[index];
        let headerStyle = {backgroundColor: headerColors[index], borderRadius: "0.5rem"}
        return (
            <TaskGroup key={index} header={priority} data={data} headerStyle={headerStyle} sort={"priorities"}/>
        )
    });
    
    return (
        <div>
            {groupTasksList}
            <NewSimpleTask settings={settings} />
        </div>
    )
}

export default TasksByPriority;