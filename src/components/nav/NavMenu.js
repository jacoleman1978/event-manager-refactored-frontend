import React, { useContext, useEffect } from "react";
import { Navbar, Button, Nav, NavDropdown } from "react-bootstrap";
import { CurrentUser } from "../../contexts/currentUser";
import UserDataService from "../../services/userDataService";
import ViewBtns from "./ViewBtns";

const NavMenu = (props) => {
    // Store current user session after successful login
    const {currentUser, setCurrentUser} = useContext(CurrentUser);

    // Props
    const { isTask, isEvent, viewType } = props;

    useEffect(() => {
        UserDataService.CheckSessionUser().then(res => setCurrentUser(res.data));
    }, [setCurrentUser])
    
    // When logout button is clicked, clear the session
    const handleLogoutClick = () => {
        UserDataService.Logout();
    };

    let dropdownTitle = '';

    if (isTask === true) {
        dropdownTitle = 'Tasks';
    } else if (isEvent === true) {
        dropdownTitle = 'Events';
    } else if (viewType === 'groups') {
        dropdownTitle = "Groups";
    } else if (viewType === 'settings') {
        dropdownTitle = 'Settings';
    }
    
    return (
        <Navbar expand='lg'>
            <Navbar.Brand href='/'>Event Manager</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navebar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav fill variant="pills" className="me-auto">
                    <Navbar.Text>View: </Navbar.Text>
                    <NavDropdown title={dropdownTitle} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/events/list/0">Events</NavDropdown.Item>
                        <NavDropdown.Item href="/tasks/priority">Tasks</NavDropdown.Item>
                        <NavDropdown.Item href="/groups">Groups</NavDropdown.Item>
                        <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                    </NavDropdown>
                    <ViewBtns isTask={isTask} isEvent={isEvent} viewType={viewType} />
                </Nav>
            </Navbar.Collapse>

            {currentUser !== null ? 
                <Button 
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