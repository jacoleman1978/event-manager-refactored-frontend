import React, { useState } from "react";
import SimpleView from "../eventViews/SimpleView";
import DetailedCompletedTaskView from "../eventViews/DetailedCompletedTaskView";

// Called from CompletedTasks.js
const CompletedTaskRow = ({task}) => {
    let [isSimpleView, setView] = useState(true);

    // How the task info is displayed to the user depends on the state of view.
    return (
        <div onClick={() => {setView(!isSimpleView)}} key={`${task._id}-view`} className="list-items">
            {isSimpleView ? <SimpleView event={task} isCompletedTask={true} /> : <DetailedCompletedTaskView task={task}/>}
        </div>
    )
}

export default CompletedTaskRow;