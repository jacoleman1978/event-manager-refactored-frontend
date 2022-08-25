import React from "react";
import { Card } from "react-bootstrap";

const CardTitleWithList = (props) => {
    let {title, list} = props;

    return (
        <>
            <Card.Text className="flex-left-center-no-gap">
                <strong>{title}:</strong> {list.length === 0 ? "None" : ""}
            </Card.Text>

            {list.length > 0 ? <ul> {list} </ul>: ""}
        </>
    )
}

export default CardTitleWithList;