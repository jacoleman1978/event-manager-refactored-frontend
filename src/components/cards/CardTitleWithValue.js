import React from "react";
import { Card } from "react-bootstrap";

const CardTitleWithValue = (props) => {
    let {title, value} = props;

    return (
        <Card.Text className="flex-left-center-no-gap">
            <strong>{title}:</strong> {value}
        </Card.Text>
    )
}

export default CardTitleWithValue