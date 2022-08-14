import React, { useState } from "react";
import SimpleView from "../eventViews/SimpleView";
import DetailedView from "../eventViews/DetailedView";

const EventRow = (props) => {
    const {event, isWeek} = props;

    // Set state for which view to display. view State changed by clicking on a list item.
    let [isSimpleView, setView] = useState(true);

    // How the task info is displayed to the user depends on the state of view.
    return (
        <div onClick={() => {setView(!isSimpleView)}} key={`${event._id}-view`} className="list-items">
            {isSimpleView ? <SimpleView event={event} /> : <DetailedView event={event} type={"event"} isWeek={isWeek} />}
        </div>
    )
}

export default EventRow;