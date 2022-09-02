import React, { useState, useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import { CurrentUser } from "../../contexts/currentUser";
import makeCheckboxUsersList from "../../helpers/makeCheckboxUsersList";
import formatUserList from "./helpers/formatUserList";

// Called from EventsByWeek.js
const UsersWithCommonEvents = ({events, setCheckboxAction, dateRange}) => {
    const { currentUser } = useContext(CurrentUser);

    let [checkboxUsersList, setCheckboxUsersList] = useState([]);

    useEffect(() => {
        // Generate and display a checkbox list of group members that have events during the given date range
        if (events[currentUser.userId] !== undefined) {
            let eventsByUser = formatUserList(events, currentUser.userId);

            setCheckboxUsersList(makeCheckboxUsersList(eventsByUser, setCheckboxAction));
        }
    }, [ currentUser, events, dateRange])

    return (
        <Form className="week-wrapper">
            <Form.Group>
                <Form.Label className="flex-left-bold">People With Common Events:</Form.Label>
                <ul className="flex-left-center-wrap">
                    {checkboxUsersList.length > 0 ? checkboxUsersList : <li key={"None"} className="list-items week-btn-width">None</li>}
                </ul>
                    
            </Form.Group>
        </Form>
    )
}

export default UsersWithCommonEvents;