import React from "react";

// Called from /tasks/TaskRow.js, /tasks/CompletedTaskRow.js, /events/EventRow.js, /events/FifteenMin.js
// For completed tasks, displays completed date and task title
// For uncompleted tasks, displays just the event title
const SimpleView = ({event, isCompletedTask}) => {
    const completedTaskDisplay = () => {
        let date = new Date(event.task.dateCompleted);
        let formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

        return (
            <div key={event._id} className="flex-left-center">
                <div className="med-padding-right"><strong>Completed Date:</strong> {formattedDate}</div>
                <div><strong>Task Title:</strong>{event.title}</div>
            </div>
        )
    }

    return (
        <div key={`${event._id}-simple`}  >
            {isCompletedTask ? completedTaskDisplay() : event.title}
        </div>
    )
}

export default SimpleView;