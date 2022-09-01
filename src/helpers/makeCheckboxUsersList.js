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
            <li key={`${user.userId}`} className="list-items week-btn-width">
                {label !== "" ? user.fullName : ""}
                <Form.Check 
                    className="flex-centered"
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