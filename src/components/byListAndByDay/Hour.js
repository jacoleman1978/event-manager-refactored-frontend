import React from "react";
import FifteenMin from "./FifteenMin";

const Hour = (props) => {
    let {hour, event} = props;

    let fifteenLabels = ["zero", "fifteen", "thirty", "forty-five"];
    let time = [`${hour}:00`, ':15', ':30', ':45'];

    let fifteens = fifteenLabels.map((fifteen, index) => {
        return (
            <FifteenMin key={`${hour}:${fifteen}`} hour={hour} fifteenLabel={fifteen} time={time[index]} event={event}/>
        )
        
    })

    return (
        <div id={`${hour}-hour`} key={`${hour}-hour`} className="hour-grid">
            {fifteens}
        </div>
    )
}

export default Hour;