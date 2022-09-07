import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import GroupDataService from "../../services/groupDataService";
import TextInputWrapper from "../form/TextInputWrapper";

const NewGroupForm = ({setCreateFlag}) => {
    let [groupName, setGroupName] = useState("");

    const onCreateGroupClick = () => {
        GroupDataService.NewGroup({groupName: groupName}).then(() => {
            setCreateFlag(true);
            setGroupName("");
        })
    }

    return (
        <div>
            <Form className="group-container">
                <Form.Group className="flex-left-center">
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