import React, { useState, useMemo } from "react";
import { Form, Button } from "react-bootstrap";
import UserDataService from "../../services/userDataService";
import TextInputWrapper from "./TextInputWrapper";
import SearchResults from "./SearchResults";
import makeAllGroupMembersArray from "./helpers/makeAllGroupMembersArray";

// Called from EditGroup.js
const UserSearch = ({group, setHasInvitedMember}) => {
    let [resultsFlag, setResultsFlag] = useState(false);
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [searchResults, setSearchResults] = useState([]);

    // Memoize an array of current users associated with a group
    let users = useMemo(() => makeAllGroupMembersArray(group), [group]);

    // When the "Search" button is clicked, retrieve a list of users fitting the criteria
    // Filter the results to omit associated users
    const handleSearch = (e) => {
        e.preventDefault();

        setSearchResults([]);
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

    return (
        <Form className="week-wrapper">
            
            <Form.Group controlId="formSearchInvite" className="flex-col-center-left">
                <TextInputWrapper label={"First Name"} defaultValue={""} setStateValue={setFirstName} />

                <TextInputWrapper label={"Last Name"} defaultValue={""} setStateValue={setLastName} />

                <Button 
                    variant="success" 
                    type="button"
                    onClick={handleSearch}
                >
                    Search
                </Button>

                {resultsFlag === true ? <SearchResults searchResults={searchResults} groupId={group._id} setHasInvitedMember={setHasInvitedMember} /> : ""}

            </Form.Group>
        </Form>

    )
}

export default UserSearch;