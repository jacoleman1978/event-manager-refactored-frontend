import React, { useState, useEffect, useMemo } from "react";
import { Form, Button } from "react-bootstrap";
import UserDataService from "../../services/userDataService";
import TextInputWrapper from "../form/TextInputWrapper";
import makeAllGroupMembersArray from "./helpers/makeAllGroupMembersArray";
import displaySearchResults from "./helpers/displaySearchResults";

// Called from EditGroup.js
const InviteUser = ({group}) => {
    let [resultsFlag, setResultsFlag] = useState(false);
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [searchResults, setSearchResults] = useState([]);
    let [formattedResults, setFormattedResults] = useState([]);

    let users = useMemo(() => makeAllGroupMembersArray(group), [group]);

    useEffect(() => {
        if (resultsFlag === true) {
            setFormattedResults(displaySearchResults(searchResults, group._id));
        }

    }, [resultsFlag])

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

    return (
        <Form className="border">
            
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

                {resultsFlag === true ? formattedResults : ""}

            </Form.Group>
        </Form>

    )
}

export default InviteUser;