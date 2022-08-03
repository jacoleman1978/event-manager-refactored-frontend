import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import UserDataService from '../../services/userDataService';
import SettingsDataService from '../../services/settingsDataService';
import { CurrentUser } from '../../contexts/currentUser';

// Called from App.js
const LoginForm = () => {
    const navigate = useNavigate();

    // Store current user session after successful login
    const { setCurrentUser } = useContext(CurrentUser);
    UserDataService.CheckSessionUser().then(res => setCurrentUser(res.data));

    // Use state to keep track of info entered into the form
    let [formUserName, setUserName] = useState("");
    let [formPassword, setPassword] = useState("");

    // Use state for error checking
    let [errorFlag, setErrorFlag] = useState(false);

    // Display error message
    const displayError = () => {
        return (
            <p>The username and password do not match. Please try again.</p>
        )
    }

    // Use the DataService to attempt to login
    const handleSubmit = (e) => {
        e.preventDefault();

        let data = {
            userName: formUserName,
            password: formPassword
        };

        UserDataService.Login(data).then(res => {
            if (res.data.userName.length > 0) {
                // Store user info in Context after successful login and redirect to default page
                setCurrentUser(res.data.session);

                SettingsDataService.GetSettings().then(res => {
                    let defaultViews = res.data.settings.views;
                    let redirectPath = '';
                    
                    if (defaultViews.login === 'Events') {
                        if (defaultViews.events === 'By List') {
                            redirectPath = '/events/list/0';
                        } else if (defaultViews.events === 'By Overview') {
                            redirectPath = '/events/overview/0';
                        } else if (defaultViews.events === 'By Day') {
                            redirectPath = '/events/day/0';
                        }
                    } else if (defaultViews.login === 'Tasks') {
                        if (defaultViews.tasks === 'By Priority') {
                            redirectPath = '/tasks/priority';
                        } else if (defaultViews.tasks === 'By Due Date') {
                            redirectPath = '/tasks/duedate';
                        }
                    } else if (defaultViews.login === 'Settings') {
                        redirectPath = '/settings';
                    } else if (defaultViews.login === 'Groups') {
                        redirectPath = '/groups';
                    }

                    navigate(redirectPath);

                });
            } else {
                setErrorFlag(true);
            }
        });
    };

    // Redirect to /auth/signup when 'Create Account' button clicked
    const handleCreateAccount = () => {
        navigate('/auth/signup');
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUserName">
                <div>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
            </Form.Group>

            <Form.Group>
                <div>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </Form.Group>

            <div>
                <Button variant="primary" type="submit">Login</Button>
                <Button 
                    variant="secondary" 
                    type="button"
                    onClick={handleCreateAccount}
                >
                    Create Account
                </Button>
            </div>
            {errorFlag ? displayError() : ""}
        </Form>
    )
}

export default LoginForm;