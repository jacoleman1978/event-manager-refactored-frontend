import React, { useContext, useEffect } from "react";
import { Navbar, Button, Nav, NavDropdown } from "react-bootstrap";
import { CurrentUser } from "../../contexts/currentUser";
import UserDataService from "../../services/userDataService";
import ViewBtns from "./ViewBtns";

const NavMenu = (props) => {
    // Store current user session after successful login
    const {currentUser, setCurrentUser} = useContext(CurrentUser);

    // Props
    const { isTask, isEvent, viewType, settings } = props;

    useEffect(() => {
        UserDataService.CheckSessionUser().then(res => setCurrentUser(res.data));
    }, [setCurrentUser])
    
    // When logout button is clicked, clear the session
    const handleLogoutClick = () => {
        UserDataService.Logout();
    };

    let dropdownTitle = '';
    let defaultActive = '';
    let defaultTasksPath = '';
    let defaultEventsPath = '';

    if (settings !== null) {
        let defaultViews = settings.views;
        if (defaultViews.tasks === 'By Priority') {
            defaultTasksPath = '/tasks/priority';
        } else if (defaultViews.tasks === 'By Due Date') {
            defaultTasksPath = '/tasks/duedate';
        }

        if (defaultViews.events === 'By List') {
            defaultEventsPath = '/events/list/0';
        } else if (defaultViews.events === 'By Day') {
            defaultEventsPath = '/events/day/0';
        } else if (defaultViews.events === 'By Week') {
            defaultEventsPath = '/events/week/0';
        }
    }

    if (isTask === true) {
        dropdownTitle = 'Tasks';

        if (viewType === 'priority') {
            defaultActive = '/tasks/priority';
        } else if (viewType === 'duedate') {
            defaultActive = '/tasks/duedate';
        } else if (viewType === 'new') {
            defaultActive = '/tasks/new';
        }

    } else if (isEvent === true) {
        dropdownTitle = 'Events';

        if (viewType === 'list') {
            defaultActive = '/events/list/0';
        } else if (viewType === 'overview') {
            defaultActive = '/events/overview/0';
        } else if (viewType === 'day') {
            defaultActive = '/events/day/0';
        } else if (viewType === 'new') {
            defaultActive = '/events/new/0'
        } else if (viewType === 'week') {
            defaultActive = '/events/week/0'
        }

    } else if (viewType === 'groups') {
        dropdownTitle = "Groups";
    } else if (viewType === 'settings') {
        dropdownTitle = 'Settings';
    }

    const btnStyle = {
        marginLeft: "0.5rem"
    }
    
    return (
        <Navbar expand='lg'>
            <Navbar.Brand href='/'>Event Manager</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navebar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav fill variant="pills" className="me-auto" defaultActiveKey={defaultActive}>
                    <Navbar.Text>View: </Navbar.Text>
                    <NavDropdown title={dropdownTitle} id="basic-nav-dropdown">
                        <NavDropdown.Item href={defaultEventsPath}>Events</NavDropdown.Item>
                        <NavDropdown.Item href={defaultTasksPath}>Tasks</NavDropdown.Item>
                        <NavDropdown.Item href="/groups">Groups</NavDropdown.Item>
                        <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                    </NavDropdown>
                    <ViewBtns 
                        isTask={isTask} 
                        isEvent={isEvent} 
                        
                    />
                </Nav>
                
            </Navbar.Collapse>
            {currentUser !== null ? <>{currentUser.fullName}</> : ""}

            {currentUser !== null ? 
                <Button 
                    style={btnStyle}
                    variant="primary" 
                    type="button" 
                    onClick={handleLogoutClick} 
                    href='/auth/login'
                >
                    Logout
                </Button> : ""}
        </Navbar>
    )
}

export default NavMenu;