import React, { useState, useEffect } from "react";
import TaskGroup from "./TaskGroup";
import NewSimpleTask from "./NewSimpleTask";
import EventDataService from "../../services/eventDataService";
import getDayDifference from "../../helpers/getDayDifference";

const TasksByDueDate = (props) => {
    // Get props
    let {settings} = props;

    // Use State for data pulled from database
    let [taskData, setTaskData] = useState([]);

    useEffect(() => {
        EventDataService.GetTasks().then(res => {
            setTaskData(res.data.tasks)})
    }, [])

    let groupTasksList =[];
    let pastTasks = [];
    let todayTasks = [];
    let tomorrowTasks = [];
    let thisWeekTasks = [];
    let futureTasks = [];

    // Function to sort tasks by dueDate categories and push them to an array of the same type
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
    for (let task of taskData) {
        sortByDate(task);
    }

    // Creating an array of arrays, where each inner array represents a specific dueDate category
    let sortedTasks = [pastTasks, todayTasks, tomorrowTasks, thisWeekTasks, futureTasks];

    // Defining the headers to be used when sorting by dueDate
    const dueDateHeaders = [
        'Past Due',
        'Due Today',
        'Due Tomorrow',
        'Due Within the Next 7 Days',
        'Future Due Dates'
    ];

    // Header background color
    let headerColors = ['red', 'orange', 'yellow', 'lightblue', 'lightgray']
    
    let data = [];

    // Making a TaskGroup by dueDate and passing in the header and appropriate data as props
    groupTasksList = dueDateHeaders.map((dueDate, index) => {
        data = sortedTasks[index];
        let headerStyle = {backgroundColor: headerColors[index], borderRadius: "0.5rem"}
        return (
            <TaskGroup key={index} header={dueDate} data={data} headerStyle={headerStyle} sort={"dueDates"}/>
        )
    });

    return (
        <div>
            {groupTasksList}
            <NewSimpleTask settings={settings}/>
        </div>
    )
}

export default TasksByDueDate;