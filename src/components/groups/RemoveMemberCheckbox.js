import React from "react";
import { Form } from "react-bootstrap";
import handleRemoveCheckboxChange from "./helpers/handleRemoveCheckboxChange";

// Called from makeMembersList.js
const RemoveMemberCheckbox = ({userId, setCheckboxAction}) => {
    return (
        <Form.Check 
            type="checkbox"
            id={`${userId}-Remove`}
            label={`Remove`}
            onChange={(e) => setCheckboxAction(handleRemoveCheckboxChange(userId, e))}
        />
    )
}

export default RemoveMemberCheckbox;