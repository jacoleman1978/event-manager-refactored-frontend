import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import GroupDataService from "../../services/groupDataService";
import TextInputWrapper from "../form/TextInputWrapper";

const NewGroupForm = () => {
    let [groupName, setGroupName] = useState("");

    return (
        <div>
            <Form className="group-container">
                <Form.Group className="flex-left-center">
                    <TextInputWrapper label={"Name"} defaultValue={""} setStateValue={setGroupName} />
                    <Button 
                        size="sm"
                        variant="success" 
                        type="button"
                        onClick={() => GroupDataService.NewGroup({groupName: groupName})}
                    >
                        Create Group
                    </Button>
                </Form.Group>
            </Form>
        </div>

    )
}

export default NewGroupForm;