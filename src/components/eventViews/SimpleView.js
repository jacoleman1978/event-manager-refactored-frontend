import React from "react";

// Called from TaskRow.js
const SimpleView = ({event}) => {
    return (
        <>
            <div key={`${event._id}-simple`}  >
                {event.title}
            </div>
        </>
    )
}

export default SimpleView;