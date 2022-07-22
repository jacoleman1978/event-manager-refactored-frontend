import React, { useContext, useEffect } from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import { CurrentUser } from "../../contexts/currentUser";
import UserDataService from "../../services/userDataService";

const NavMenu = () => {
    // Store current user session after successful login
    const {currentUser, setCurrentUser} = useContext(CurrentUser);

    useEffect(() => {
        UserDataService.CheckSessionUser().then(res => setCurrentUser(res.data));
    }, [setCurrentUser])
    
    
    // When logout button is clicked, clear the session
    const handleLogoutClick = () => {
        UserDataService.Logout();
    };
    
    return (
        <Navbar expand='lg'>
            <Navbar.Brand href='/'>Event Manager</Navbar.Brand>
            <Nav fill variant="pills">
                <Nav.Link href='/tasks/priority'>By Priority</Nav.Link>
                <Nav.Link href='/tasks/duedate'>By Due Date</Nav.Link>
                <Nav.Link href='/events/list/0'>By List</Nav.Link>
                <Nav.Link href='/events/overview/0'>By Overview</Nav.Link>
                <Nav.Link href='/events/day/0'>By Day</Nav.Link>
                <Nav.Link href='/groups'>Groups</Nav.Link>
                <Nav.Link href='/settings'>Settings</Nav.Link>
            </Nav>
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