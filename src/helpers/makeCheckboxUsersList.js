import React from "react";
import { Form } from "react-bootstrap";
import handleCheckboxChange from "./handleCheckboxChange";

/*
-userDocs is a list of user objects
-setCheckboxAction sets state with an updated list of userIds that are checked
-Returns a list of list items of the user's name with a checkbox
*/
const makeCheckboxUsersList = (formattedUsersList, setCheckboxAction, label="") => {
    const checkboxUsersList = formattedUsersList.map((user) => {
        return (
            <li key={`${user.userId}`} className="list-items med-padding-right">
                
                {label !== "" ? <div className="auto-margin-right">{user.fullName}</div> : ""}
                <Form.Check 
                    className="flex-centered-no-gap xsmall-gap"
                    type="checkbox"
                    id={user.userId}
                    label={label}
                    onChange={(e) => setCheckboxAction(handleCheckboxChange(user.userId, e))}
                />
                {label === "" ? user.fullName : ""}
            </li>
        )
    })

    return checkboxUsersList;
}

export default makeCheckboxUsersList;