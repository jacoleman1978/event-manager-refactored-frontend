import React from "react";
import { Card } from "react-bootstrap";

// Use passed in title and value to return a the title and value on the same line
const CardTitleWithValue = ({title, value}) => {
    return (
        <Card.Text className="flex-left-center-no-gap xxsmall-gap">
            <strong>{title}:</strong> {value}
        </Card.Text>
    )
}

export default CardTitleWithValue