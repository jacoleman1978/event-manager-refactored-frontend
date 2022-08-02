import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import UserDataService from "../../services/userDataService";

const ChangePassword = () => {
    // Use state to keep track of info entered into the form
    let [formCurrentPwd, setCurrentPwd] = useState("");
    let [formNewPwd, setNewPwd] = useState("");
    let [formVerifyNewPwd, setVerifyNewPwd] = useState("");
    let [passwordErrorFlag, setPasswordErrorFlag] = useState(false);

    // Use the DataService to submit new user account info
    const handleSubmit = (e) => {
        e.preventDefault();

        // If the two password fields match contents, continue verification
        if (formNewPwd === formVerifyNewPwd) {
            setPasswordErrorFlag(false);

            let data = {
                currentPwd: formCurrentPwd,
                newPassword: formNewPwd
            };

            UserDataService.ChangePassword(data);
        } else {
            setPasswordErrorFlag(true);
        }
    };

    // Display passwords not matching error on form if an error flag has been set
    const passwordMismatchErrorMessage = "Passwords Do Not Match";

    return (
        <div className="group-container">
            <p className="flex-left-bold">Change Password:</p>
            <Form onSubmit={handleSubmit} >
                <Form.Group controlId="formCurrentPwd" className="flex-left-center">
                    <Form.Label>Current:</Form.Label>
                    <Form.Control
                        required
                        className="input-width"
                        type="password"
                        aria-describedby="Enter current password"
                        placeholder="Enter current password"
                        onChange={(e) => setCurrentPwd(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formNewPwd" className="flex-left-center">
                    <Form.Label>New Password:</Form.Label>
                    <Form.Control 
                        type="password"
                        className="input-width"
                        placeholder="Enter new password"
                        onChange={(e) => setNewPwd(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formVerifyNewPwd" className="flex-left-center">
                    <Form.Label>Verify Password:</Form.Label>
                    <Form.Control 
                        type="password"
                        className="input-width"
                        placeholder="Verify new password"
                        onChange={(e) => setVerifyNewPwd(e.target.value)}
                        required
                    />
                </Form.Group>
                
                {passwordErrorFlag ? passwordMismatchErrorMessage : ""}

                <Button variant="primary" type="submit">
                    Submit New Password
                </Button>

            </Form>
        </div>
    )
}

export default ChangePassword;