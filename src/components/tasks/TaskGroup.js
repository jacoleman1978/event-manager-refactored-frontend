import React from "react";
import TaskRow from "./TaskRow";

// Called by TasksByDueDate.js and TasksByPriority.js
const TaskGroup = (props) => {
    const {tasks} = props;

    // tasksList will be filled in the conditional below
    let tasksDisplay =[];

    let headerStyle = {backgroundColor: tasks.headerColor, borderRadius: "0.5rem"};

    // If the data passed in has data in it, send each task to the the TaskRow React Component. Otherwise pass in an object that will display 'No tasks found' under the priority.
    if (tasks.sortedTasks.length > 0) {
        tasksDisplay = tasks.sortedTasks.map((task) => {
            return (
                <li key={task._id} >
                    <div >
                        <TaskRow task={task} />
                    </div>
                </li>
            )
        });
    } else {
        tasksDisplay = [
            <li key={0}>
                {"No tasks found"}
            </li>
        ];
    }

    // Style for the GroupTask
    const groupStyle = {
        margin: "1rem 0rem"
    }

    // headerStyle was passed in as prop from TaskList and determines the background color of each header.
    return (
        <div style={groupStyle}>
            <div style={headerStyle}>
                {tasks.header}
            </div>
            <ul>
                {tasksDisplay}
            </ul>
        </div>
    )
}

export default TaskGroup;