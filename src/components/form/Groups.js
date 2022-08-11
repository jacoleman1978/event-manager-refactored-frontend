import React from "react";
import { Form } from "react-bootstrap";

const Groups = (props) => {
    let { groupEditList, formGroups, setGroups, label} = props;

    const handleGroupCheck = (e) => {
        if (e.target.checked === true) {
            setGroups(formGroups => [...formGroups, e.target.id]);
        } else {
            setGroups(formGroups => formGroups.filter((group) => {
                return group !== e.target.id
            }))
        }
    }

    let groupList = groupEditList.map((group) => {
        let isChecked = false;

        if (formGroups.indexOf(group._id) > -1) {
            isChecked = true;
        }
        return (
            <Form.Check
                key={group._id}
                type="checkbox"
                label={group.name}
                name="groups-can-edit"
                checked={isChecked}
                id={group._id}
                onChange={(e) => handleGroupCheck(e)}
            />
        )
    })

    return (
        <Form.Group controlId="formTask" >
            <Form.Label>{label}</Form.Label>
            <div className="checkbox-list">
                {groupList}
            </div>
        </Form.Group>
    )
}

export default Groups;