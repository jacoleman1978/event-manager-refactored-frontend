import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import UserDataService from "../../services/userDataService";
import PasswordInput from "./PasswordInput";

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
            <Form onSubmit={handleSubmit} >
                <PasswordInput label={"Current"} setPassword={setCurrentPwd} />

                <PasswordInput label={"New"} setPassword={setNewPwd} />

                <PasswordInput label={"Verify"} setPassword={setVerifyNewPwd} />
                
                {passwordErrorFlag ? passwordMismatchErrorMessage : ""}

                <Button variant="primary" type="submit">
                    Submit New Password
                </Button>

            </Form>
        </div>
    )
}

export default ChangePassword;