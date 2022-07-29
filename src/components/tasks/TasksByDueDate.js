import React, { useState, useEffect } from "react";
import TaskGroup from "./TaskGroup";
import NewSimpleTask from "./NewSimpleTask";
import EventDataService from "../../services/eventDataService";

const TasksByDueDate = () => {
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

    // Need today's date, but do not want time to be part of it, since user selected due date did not have a time
    const todayDate = new Date();
    let todayYear = todayDate.getFullYear();
    let todayMonth = todayDate.getMonth();
    let todayDay = todayDate.getDate();
    let today = new Date(todayYear, todayMonth, todayDay);

    // Calculate the number of milliseconds(ms) in one day
    const msInOneDay = 1000 * 60 * 60 * 24;

    // Function to sort tasks by dueDate categories and push them to an array of the same type
    const sortByDate = (task) => {
        // Need dueDate, but do not want time to be part of it, since user selected due date did not have a time. Date in formate of 'YYYY-MM-DD'.
        let deconstructedDueDate = task.allDay.endDate.split('-');
        
        let dueYear = deconstructedDueDate[0];
        // Months in the date function are from 0 to 11, so need to subtract one from the actual month to get the correct integer to use in Date()
        let dueMonth = deconstructedDueDate[1] - 1;
        let dueDay = deconstructedDueDate[2].split('T')[0];

        let dueDate = new Date(dueYear, dueMonth, dueDay)
        // Find the difference in ms between today and the dueDate
        let daysUntilDue = (dueDate.getTime() - today.getTime()) / msInOneDay;

        //console.log(daysUntilDue)

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
    
    let data =[];

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
            <NewSimpleTask />
        </div>
    )
}

export default TasksByDueDate;