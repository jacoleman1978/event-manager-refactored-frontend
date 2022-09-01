import React from "react";
import { Form } from "react-bootstrap";
import handleCheckboxChange from "../../helpers/handleCheckboxChange";

// Called from makeMembersList.js
const RemoveMemberCheckbox = ({userId, setCheckboxAction}) => {
    return (
        <Form.Check 
            type="checkbox"
            id={`${userId}-Remove`}
            label={`Remove`}
            onChange={(e) => setCheckboxAction(handleCheckboxChange(userId, e))}
        />
    )
}

export default RemoveMemberCheckbox;