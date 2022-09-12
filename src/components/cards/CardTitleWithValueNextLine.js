import React from "react";
import { Card } from "react-bootstrap";

// Called by /eventViews/DetailedView.js
// Use the passed in title and value to return the title with the value indented on the next line
const CardTitleWithValueNextLine = ({title, value}) => {
    return (
        <div className="flex-col-center-left-no-gap">
            <Card.Text><strong>{title}:</strong></Card.Text>
            <Card.Text className="left-margin">{value}</Card.Text>
        </div>

    )
}

export default CardTitleWithValueNextLine;