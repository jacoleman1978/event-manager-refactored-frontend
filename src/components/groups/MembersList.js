import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import makeMembersList from "./helpers/makeMembersList";

// Called from EditGroup.js
const MembersList = ({editorIds, viewerIds, setPermissionChange, setCheckboxAction}) => {
    let [groupEditorsList, setEditorsList] = useState([]);
    let [groupViewersList, setViewersList] = useState([]);

    useEffect(() => {
        if (groupEditorsList.length === 0) {
            setEditorsList(makeMembersList(editorIds, 'Editor', setPermissionChange, setCheckboxAction));
        }

        if (groupViewersList.length === 0) {
            setViewersList(makeMembersList(viewerIds, 'Viewer', setPermissionChange, setCheckboxAction));
        }
    }, [])

    return (
        <Form.Group>
            <Form.Label className="flex-left-bold">Members:</Form.Label>
            <ul className="flex-col-center-left-no-gap small-gap">
                {groupEditorsList.length > 0 ? groupEditorsList : ""} 
                {groupViewersList.length > 0 ? groupViewersList : ""} 
                {groupEditorsList.length + groupViewersList.length === 0 ? <div className="small-font small-padding">None</div> : ""}
            </ul>
        </Form.Group>
    )
}

export default MembersList;