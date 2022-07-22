import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
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
            UserDataService.IsSignupInfoUnique(data).then(res => {
                if (res.data.isUniqueUserName === false) {
                    setUserNameErrorFlag(true);
                } else {
                    setUserNameErrorFlag(false);

                    // TODO UserName is unique, so create user account and redirect to ...
                    UserDataService.Signup(data).then(res => {
                        // TODO navigate(``);
                    });
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

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Enter First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Enter Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Enter Username"
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                        <Form.Text>
                            {userNameErrorFlag ? userNameErrorMessage : ""}
                        </Form.Text>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formVerifyPassword">
                        <Form.Label>Verify Password</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder="Verify Password"
                            onChange={(e) => setVerifyPassword(e.target.value)}
                            required
                        />
                        <Form.Text>
                            {passwordErrorFlag ? passwordMismatchErrorMessage : ""}
                        </Form.Text>
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Create Account
                </Button>

            </Form>
        </div>
    )
}

export default SignupForm;