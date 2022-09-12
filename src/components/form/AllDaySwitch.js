import React from "react";
import { Form } from "react-bootstrap";

// Called by /events/EventForm.js, /tasks/TaskForm.js
const AllDaySwitch = ({formAllDay, setAllDay}) => {
    // 'All Day' state switch
    return (
        <div className="flex-left-center-wrap">
            <Form.Check 
                className="flex-centered small-right-left-margins small-font"
                type="switch"
                id="is-all-day"
                label="All Day"
                checked={formAllDay}
                onChange={() => setAllDay(!formAllDay)}
            />
        </div>
    )
}

export default AllDaySwitch;