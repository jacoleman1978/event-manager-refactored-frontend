import React from "react";
import { Card } from "react-bootstrap";

const CardTitleWithList = (props) => {
    let {title, list} = props;

    return (
        <>
            <Card.Text className="flex-left-center-no-gap">
                <strong>{title}:</strong> 
            </Card.Text>
            <ul>
                {list.length > 0 ? list: "None"}
            </ul>
            
        </>
    )
}

export default CardTitleWithList;