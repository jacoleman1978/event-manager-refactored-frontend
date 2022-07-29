import React from "react";
import PriorityRow from "./PriorityRow";

const PriorityGroup = (props) => {
    // Props
    const {header, data, headerStyle} = props;

    // tasksList will be filled in the conditional below
    let tasksList =[];

    // Style for each row
    const rowStyle = {
        display: "flex",
        marginTop: "5px",
    }

    // If the data passed in has data in it, send each task to the the TaskRow React Component. Otherwise pass in an object that will display 'No tasks found' under the priority.
    if (data.length > 0) {
        tasksList = data.map((task) => {
            return (
                <li key={task._id} >
                    <div style={rowStyle}>
                        <PriorityRow task={task} needButtons={true} />
                    </div>
                </li>
            )
        });
    } else {
        const task = {_id: "", notes: "No tasks found", task: {priority: "", dueData: ""}}
        tasksList = [
            <li key={0}>
                <PriorityRow task={task} needButtons={false}/>
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
                {header}
            </div>
            <ul>
                {tasksList}
            </ul>
        </div>
    )
}

export default PriorityGroup;