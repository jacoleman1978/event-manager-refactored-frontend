import React from "react";
import { Form } from "react-bootstrap";

const AllDaySwitch = (props) => {
    let {formAllDay, setAllDay} = props;

    return (
        <div className="flex-left-center-wrap">
            <Form.Check 
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