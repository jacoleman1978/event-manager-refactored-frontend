import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import EventDataService from "../../services/eventDataService";

// Called from DetailedView.js
const DisplayButtonGroup = ({event, type}) => {
    const navigate = useNavigate();

    // TODO: Archive the event
    const completeEvent = (e) => {
        e.preventDefault();
        EventDataService.DeleteEvent(event._id);
    }

    const editEvent = () => {
        navigate(`/${type}s/edit/${event._id}/`);
    }

    const deleteEvent = (e) => {
        e.preventDefault();
        EventDataService.DeleteEvent(event._id);
    }

    return (
        <div className={"flex-center-wrap"} key={`${event._id}-buttons`}>
            {type === 'task' ? <Button
                    variant="success"
                    onClick={completeEvent}
                >
                    <i className="fa-regular fa-circle-check"></i>
                </Button> : ""
            }

            <Button
                variant="warning"
                onClick={editEvent}
            >
                <i className="far fa-edit"></i>
            </Button>

            <Button
                variant="danger"
                onClick={deleteEvent}
            >
                <i className="fas fa-trash-alt"></i>
            </Button>
        </div>
    )
}

export default DisplayButtonGroup;