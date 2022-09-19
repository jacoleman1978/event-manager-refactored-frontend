import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import GroupDataService from "../../services/groupDataService";
import TextInputWrapper from "./TextInputWrapper";

// Called from Groups.js
// Make a new group with the name inputted, while maintaining state for the setCreateFlag
const NewGroupForm = ({setCreateFlag}) => {
    let [groupName, setGroupName] = useState("");

    const onCreateGroupClick = () => {
        GroupDataService.NewGroup({groupName: groupName}).then(() => {
            setCreateFlag(true);
        })
    }

    return (
        <div>
            <Form className="group-container-no-set-width">
                <Form.Group className="flex-center-center-wrap">
                    <TextInputWrapper label={"Name"} defaultValue={""} setStateValue={setGroupName} />
                    <Button 
                        size="sm"
                        variant="success" 
                        type="button"
                        onClick={onCreateGroupClick}
                    >
                        Create Group
                    </Button>
                </Form.Group>
            </Form>
        </div>

    )
}

export default NewGroupForm;