import React from "react";

const SimpleView = (props) => {
    let {event} = props;

    return (
        <>
            <div key={`${event._id}-simple`}  >
                {event.title}
            </div>
        </>
    )
}

export default SimpleView;