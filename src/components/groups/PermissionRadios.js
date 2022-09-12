import React from "react";
import { Form } from "react-bootstrap";

// Called from makeMembersList.js
// Create, set and maintain state on a permissionChange object, indicating whether the user's permission has been changed
const PermissionRadios = ({type, userId, setPermissionChange}) => {
    const handleRadio = (e) => {
        let permissionChange = {
            addId: [],
            removeId: []
        }

        let radioId = e.target.id.split("-")

        if (radioId[1] === type) {
            permissionChange.removeId = radioId;
        } else if (radioId[1] !== type) {
            permissionChange.addId = radioId;
        }

        return permissionChange
    }

    return (
        <>
            <Form.Check 
                className="flex-centered-no-gap remove-margins xsmall-gap"
                defaultChecked={type === 'Editor'}
                type="radio"
                id={`${userId}-Editor`}
                label={'Editor'}
                name={`${userId}`}
                onChange={e => setPermissionChange(handleRadio(e))}
            />
            <Form.Check 
                className="flex-centered-no-gap remove-margins xsmall-gap"
                defaultChecked={type === 'Viewer'}
                type="radio"
                id={`${userId}-Viewer`}
                label={'Viewer'}
                name={`${userId}`}
                onChange={e => setPermissionChange(handleRadio(e))}
            />
        </>
    )
}

export default PermissionRadios;