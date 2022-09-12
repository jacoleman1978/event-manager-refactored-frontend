import React from "react";
import { Card } from "react-bootstrap";

// Called by /eventViews/DetailedView.js
// Use passed in title and list to create a Card list
const CardTitleWithList = ({title, list}) => {
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