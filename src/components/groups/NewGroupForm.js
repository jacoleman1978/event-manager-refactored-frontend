import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import GroupDataService from "../../services/groupDataService";

const NewGroupForm = () => {
    let [groupName, setGroupName] = useState("");

    const handleCreateGroup = () => {
        GroupDataService.NewGroup({groupName: groupName});
    }

    return (
        <div>
            <p className="title">Create a New Group</p>
            <Form className="group-container">
                <Form.Group className="flex-left-center">
                    <Form.Label className="flex-left-bold">Name:</Form.Label>
                    <Form.Control className="input-width" onChange={(e) => setGroupName(e.target.value)}/>
                    <Button 
                        size="sm"
                        variant="success" 
                        type="button"
                        onClick={() => handleCreateGroup()}
                    >
                        Create Group
                    </Button>
                </Form.Group>
            </Form>
        </div>

    )
}

export default NewGroupForm;