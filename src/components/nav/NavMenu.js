import React, { useContext, useEffect } from "react";
import { Navbar, Button, Nav, NavDropdown } from "react-bootstrap";
import { CurrentUser } from "../../contexts/currentUser";
import UserDataService from "../../services/userDataService";
import ViewBtns from "./ViewBtns";
import getDefaultTasksPath from "./helpers/getDefaultTasksPath";
import getDefaultEventsPath from "./helpers/getDefaultEventsPath";
import getActiveView from "./helpers/getActiveView";

// Called from DisplayContainer.js
const NavMenu = ({ isTask, isEvent, viewType, settings }) => {
    const {currentUser, setCurrentUser} = useContext(CurrentUser);

    // If the user has a current session, set CurrentUser context
    useEffect(() => {
        UserDataService.CheckSessionUser().then(res => setCurrentUser(res.data));
    }, [])

    // Sets display option for View and highlights active Nav button, if applicaple
    let {dropdownTitle, defaultActive} = getActiveView(isTask, isEvent, viewType);
    
    // Use default setting values to set redirection path when Events or Tasks are selected from View: dropdown menue
    let defaultTasksPath = getDefaultTasksPath(settings.views.tasks);
    let defaultEventsPath = getDefaultEventsPath(settings.views.events);
    
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

            <div className="flex-centered">
                {currentUser !== null ? <>{currentUser.fullName}</> : ""}

                {currentUser !== null ? 
                    <Button 
                        className="logout-btn"
                        variant="danger" 
                        type="button" 
                        onClick={UserDataService.Logout} 
                        href='/auth/login'
                    >
                        Logout
                    </Button> : ""
                }
            </div>

        </Navbar>
    )
}

export default NavMenu;