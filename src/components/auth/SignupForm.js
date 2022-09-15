import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import UserDataService from '../../services/userDataService';

// Called from App.js
const SignupForm = () => {
    const navigate = useNavigate();

    // Use state to keep track of info entered into the form
    let [formFirstName, setFirstName] = useState("");
    let [formLastName, setLastName] = useState("");
    let [formUserName, setUserName] = useState("");
    let [formPassword, setPassword] = useState("");
    let [formVerifyPassword, setVerifyPassword] = useState("");

    // Use state for error checking
    let [passwordErrorFlag, setPasswordErrorFlag] = useState(false);
    let [userNameErrorFlag, setUserNameErrorFlag] = useState(false);

    // Use the DataService to submit new user account info
    const handleSubmit = (e) => {
        e.preventDefault();

        // If the two password fields match contents, continue verification
        if (formPassword === formVerifyPassword) {
            setPasswordErrorFlag(false);

            let data = {
                firstName: formFirstName,
                lastName: formLastName,
                userName: formUserName,
                password: formPassword
            };

            // Verify that userName is unique
            UserDataService.IsSignupInfoUnique(data).then(async(res) => {
                if (res.data.isUniqueUserName === false) {
                    setUserNameErrorFlag(true);
                } else {
                    setUserNameErrorFlag(false);

                    // UserName is unique, so create user account and redirect to ...
                    UserDataService.Signup(data);
            
                    navigate('/settings');
                }
            });
        } else {
            setPasswordErrorFlag(true);
        }
    };

    // Display userName error message on form if an error flag has been set
    const userNameErrorMessage = "Username Already Taken";

    // Display passwords not matching error on form if an error flag has been set
    const passwordMismatchErrorMessage = "Passwords Do Not Match";

    // Redirect to /auth/login when Back to Login button clicked
    const handleBackToLogin = () => {
        navigate('/auth/login')
    };

    return (
        <div>
            <Button
                type="button"
                variant="secondary"
                onClick={handleBackToLogin}
            >
                Back to Login
            </Button>
            <div className="flex-centered">
                <Form onSubmit={handleSubmit} className="tan-container-centered">

                    <div className="flex-left-center-no-gap">
                        <Form.Group className="outline-centered">
                            <Form.Label className="flex-left-bold text-nowrap">First Name:</Form.Label>
                            <Form.Control 
                                type="text"
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="outline-centered">
                            <Form.Label className="flex-left-bold text-nowrap">Last Name:</Form.Label>
                            <Form.Control 
                                type="text"
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </div>

                    <Form.Group className="outline-centered">
                        <Form.Label className="flex-left-bold">Username:</Form.Label>
                        <Form.Control 
                            type="text"
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                        <Form.Text>
                            {userNameErrorFlag ? userNameErrorMessage : ""}
                        </Form.Text>
                    </Form.Group>

                    <div className="flex-left-center-no-gap">
                        <Form.Group className="outline-centered">
                            <Form.Label className="flex-left-bold">Password:</Form.Label>
                            <Form.Control 
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="outline-centered">
                            <Form.Label className="flex-left-bold text-nowrap">Verify Password:</Form.Label>
                            <Form.Control 
                                type="password"
                                onChange={(e) => setVerifyPassword(e.target.value)}
                                required
                            />
                            <Form.Text>
                                {passwordErrorFlag ? passwordMismatchErrorMessage : ""}
                            </Form.Text>
                        </Form.Group>
                    </div>

                    <div className="flex-centered">
                        <Button variant="primary" type="submit">
                            Create Account
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default SignupForm;