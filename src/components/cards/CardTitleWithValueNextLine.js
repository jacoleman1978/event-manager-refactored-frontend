import React from "react";
import { Card } from "react-bootstrap";

const CardTitleWithValueNextLine = (props) => {
    let {title, value} = props;

    return (
        <div className="flex-col-center-left-no-gap">
            <Card.Text><strong>{title}:</strong></Card.Text>
            <Card.Text className="left-margin">{value}</Card.Text>
        </div>

    )
}

export default CardTitleWithValueNextLine;