import React from "react";

const GroupMembership = (props) => {
    // Get props
    const {group} = props;

    let owner = `${group.ownerId.firstName} ${group.ownerId.lastName}`;

    let editorMembers = group.editorIds.map((editorId, i) => {
        return (
            <li key={`editor-${i}`}>
                {`${editorId.firstName} ${editorId.lastName}`}
            </li>
        )
    })

    let viewerMembers = group.viewerIds.map((viewerId, i) => {
        return (
            <li key={`viewer-${i}`}>
                {`${viewerId.firstName} ${viewerId.lastName}`}
            </li>
        )
    })

    let invitees = group.inviteeIds.map((inviteeId, i) => {
        return (
            <li key={`invitee-${i}`}>
                {`${inviteeId.firstName} ${inviteeId.lastName}`}
            </li>
        )
    })

    const groupContainer = {
        border: "1px solid black",
        margin: "0.5rem",
        backgroundColor: "antiquewhite",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
    }

    const groupLabel = {
        marginBottom: "0rem",
        textDecoration: "underline",
        fontSize: "larger",
        fontWeight: "bold"
    }

    const ownerRowStyle = {
        display: "flex",
        gap: "0.5rem"
    }

    const labelStyle = {
        display: "flex",
        justifyContent: "left",
        fontWeight: "bold",
        marginBottom: "0rem"
    }

    const memberStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "flex-start"
    }

    return (
        <div style={groupContainer}>
            <div>
                <p style={groupLabel}>{group.name}</p>
                <hr />
                <div style={ownerRowStyle}>
                    <strong>Owner:</strong>
                        {owner}  
                </div>
                <div style={labelStyle}>Editor Members:</div>
                <ul style={memberStyle}>
                    {editorMembers.length > 0 ? editorMembers : "None"} 
                </ul>
                <div style={labelStyle}>Viewer Members:</div>
                <ul style={memberStyle}>
                    {viewerMembers.length > 0 ? viewerMembers : "None"}
                </ul>
                <div style={labelStyle}>People Invited to Join:</div>
                <ul style={memberStyle}>
                    {invitees.length > 0 ? invitees : "None"}
                </ul>
            </div>
        </div>
    )
}

export default GroupMembership;