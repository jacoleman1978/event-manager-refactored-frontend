import React from "react";
import TaskRow from "./TaskRow";

// Called by TasksByDueDate.js and TasksByPriority.js
const TaskGroup = ({tasks}) => {
    // tasksList will be filled in the conditional below
    let tasksDisplay =[];

    let headerStyle = {backgroundColor: tasks.headerColor, borderRadius: "0.5rem", border: "solid black 1px", fontWeight: "bold"};

    // If the data passed in has data in it, send each task to the the TaskRow React Component. Otherwise pass in an object that will display 'No tasks found' under the priority.
    if (tasks.sortedTasks.length > 0) {
        tasksDisplay = tasks.sortedTasks.map((task) => {
            return (
                <li key={task._id} className="remove-bullet-pt">
                    <TaskRow task={task} />
                </li>
            )
        });
    } else {
        tasksDisplay = [
            <li key={0} className="remove-bullet-pt">
                <div className="list-items">
                    {"No tasks found"}
                </div>
            </li>
        ];
    }

    // headerStyle was passed in as prop from TaskList and determines the background color of each header.
    return (
        <div className="outline med-padding">
            <div style={headerStyle}>
                {tasks.header}
            </div>
            <ul className="week-wrapper xsmall-gap">
                {tasksDisplay}
            </ul>
        </div>
    )
}

export default TaskGroup;