import React from "react";
import { Form } from "react-bootstrap";

// Called by events/EventForm.js
const Groups = ({ groupEditList, formGroups, setGroups, label}) => {
    // Displays and maintains selected groups
    const handleGroupCheck = (e) => {
        if (e.target.checked === true) {
            setGroups(formGroups => [...formGroups, e.target.id]);
        } else {
            setGroups(formGroups => formGroups.filter((group) => {
                return group !== e.target.id
            }))
        }
    }

    // Checks the appropriate checkboxes as a default display
    let groupList = groupEditList.map((group) => {
        let isChecked = false;

        if (formGroups.indexOf(group._id) > -1) {
            isChecked = true;
        }
        return (
            <div className="outline-inner" key={group._id}>
                <Form.Check
                    className="small-font flex-left-center"
                    key={group._id}
                    type="checkbox"
                    label={group.name}
                    name="groups-can-edit"
                    checked={isChecked}
                    id={group._id}
                    onChange={(e) => handleGroupCheck(e)}
                />
            </div>

        )
    })

    return (
        <Form.Group controlId="formTask" >
            <Form.Label className="flex-left-bold">{label}</Form.Label>
            <div className="checkbox-list">
                {groupList}
            </div>
        </Form.Group>
    )
}

export default Groups;