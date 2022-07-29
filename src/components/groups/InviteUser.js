import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import GroupDataService from "../../services/groupDataService";
import UserDataService from "../../services/userDataService";

const InviteUser = (props) => {
    const {group, setNewInviteFlag} = props;

    let groupId = group._id;

    let [resultsFlag, setResultsFlag] = useState(false);
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [searchResults, setSearchResults] = useState([]);
    let [formattedResults, setFormattedResults] = useState([]);

    let users = [group.ownerId];

    for (let editorDoc of group.editorIds) {
        users.push(editorDoc._id);
    }

    for (let viewerDoc of group.viewerIds) {
        users.push(viewerDoc._id);
    }

    for (let inviteeDoc of group.inviteeIds) {
        users.push(inviteeDoc._id);
    }

    useEffect(() => {
        if (resultsFlag === true) {
            setFormattedResults(handleSearchDisplay(searchResults));
        }

    }, [resultsFlag])

    const handleInvite = (invitedUserId) => {
        let data = {
            groupId: groupId,
            invitedUserId: invitedUserId
        }

        GroupDataService.InviteGroupMember(data);

        setNewInviteFlag(true);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchResults([]);
        setFormattedResults([]);
        setResultsFlag(false);

        let data = {
            firstName: firstName,
            lastName: lastName
        }

        UserDataService.SearchUser(data).then(res => {
            if (res.data.searchResults.length > 0) {
                let filteredSearch = res.data.searchResults.filter((result) => {
                    return users.includes(result._id) === false
                });

                setSearchResults(filteredSearch);

                setResultsFlag(true);
            }
        })
    }

    const handleSearchDisplay = (searchResults) => {
        let userNameList = searchResults.map((user) => {
            return (
                <div key={`${user._id}`} className="flex-left-center">
                    {`${user.firstName} ${user.lastName}`}
                    <Button 
                        size="sm"
                        variant="primary" 
                        type="button"
                        onClick={() => handleInvite(user._id)}
                    >
                        Invite User
                    </Button>
                </div>
            )
        })

        return userNameList
    }

    return (
        <Form className="border">
            
            <Form.Group controlId="formSearchInvite" className="flex-col-center-left">
                <div className="flex-left-center">
                    <Form.Label className="flex-left-bold">First Name:</Form.Label>
                    <Form.Control 
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input-width"
                    />
                </div>

                <div className="flex-left-center">
                    <Form.Label className="flex-left-bold">Last Name:</Form.Label>
                    <Form.Control 
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        className="input-width"
                    />
                </div>

                <Button 
                    variant="success" 
                    type="button"
                    onClick={handleSearch}
                >
                    Search
                </Button>

                {resultsFlag === true ? formattedResults : ""}

            </Form.Group>
        </Form>

    )
}

export default InviteUser;