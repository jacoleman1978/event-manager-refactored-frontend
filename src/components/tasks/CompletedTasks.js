import React, { useState, useEffect } from "react";
import EventDataService from "../../services/eventDataService";
import CompletedTaskRow from "./CompletedTaskRow";

const CompletedTasks = () => {
    let [completedTasksDisplay, setCompletedTasksDisplay] = useState([]);

    useEffect(() => {
        EventDataService.GetCompletedTasks().then((res) => {
            let completedTasks = res.data.tasks.map((task) => {
                return (
                    <CompletedTaskRow key={task._id} task={task} />
                )
            })
            setCompletedTasksDisplay(completedTasks);
        })
    }, [])

    return (
        <div>
            <p className="title">Completed Tasks</p>
            <div className="outline small-top-margin">
                <div className="week-wrapper xsmall-gap">
                    {completedTasksDisplay}
                </div>
            </div>
        </div>
    )
}

export default CompletedTasks