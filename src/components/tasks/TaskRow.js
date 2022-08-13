import React, { useState } from "react";
import SimpleView from "../eventViews/SimpleView";
import DetailedView from "../eventViews/DetailedView";

// Called from TaskGroup.js
const TaskRow = (props) => {
    const {task} = props;

    // Set state for which view to display. view State changed by clicking on a list item.
    let [isSimpleView, setView] = useState(true);

    // How the task info is displayed to the user depends on the state of view.
    return (
        <div onClick={() => {setView(!isSimpleView)}} key={`${task._id}-view`} className="list-items">
            {isSimpleView ? <SimpleView event={task} /> : <DetailedView event={task} type={"task"} />}
        </div>
    )
}

export default TaskRow;