import React, { useState } from "react";
import { Button } from "react-bootstrap";
import GroupDataService from "../../services/groupDataService";

const DeleteGroup = ({groupId}) => {
    let [shouldWarn, setShouldWarn] = useState(false);

    const onDeleteClick = () => {
        setShouldWarn(!shouldWarn);
    }

    const onConfirmDeletionClick = () => {
        GroupDataService.DeleteGroup(groupId)
    }

    return (
        <div className="week-wrapper">
            <div className="flex-centered">
                <Button
                    className="top-bottom-margins"
                    variant="warning"
                    type="button"
                    onClick={onDeleteClick}
                >
                    Delete
                </Button>
            </div>

            {shouldWarn ? 
                <div className="delete-warning-container">
                    <strong>Warning:</strong> Press 'Confirm' to permanently delete the Group.
                    <Button
                        className="top-bottom-margins"
                        variant="danger"
                        type="button"
                        onClick={onConfirmDeletionClick}
                    >
                        Confirm
                    </Button>
                </div> : ""
            }
        </div>
    )
}

export default DeleteGroup;