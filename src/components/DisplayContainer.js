import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "../contexts/currentUser";
import UserDataService from "../services/userDataService";
import SettingsDataService from "../services/settingsDataService";
import Events from "./events/Events";
import Tasks from "./tasks/Tasks";
import Groups from "./groups/Groups";
import Settings from "./settings/Settings";
import NavMenu from "./nav/NavMenu";

// Called from App.js
const DisplayContainer = ({ isTask, isEvent, viewType }) => {
    const navigate = useNavigate();

    const { currentUser } = useContext(CurrentUser);

    let [settings, setSettings] = useState(null);
    let [areSettingsLoaded, setAreSettingsLoaded] = useState(false);

    useEffect(() => {
        // If user doesn't have a current session, redirect to the login view
        if (currentUser === null) {
            UserDataService.CheckSessionUser().then(res => {
                if (res.data === null) {
                    navigate('/auth/login');
                }
            })
        } 

        // If settings are null, get them
        if (settings === null) {
            SettingsDataService.GetSettings().then(res => {
                setSettings(res.data.settings);
            })
        }
    }, [])

    useEffect(() => {
        // Settings retrieved, so set flag to display NavMenu and selected view
        if (settings !== null && !areSettingsLoaded) {
            setAreSettingsLoaded(true);
        }
    }, [settings])

    // Return the NavMenu with the selected view
    const displayNavAndView = () => {
        return (
            <>
                <NavMenu 
                    isTask={isTask} 
                    isEvent={isEvent} 
                    viewType={viewType} 
                    settings={settings}
                />
                {selectView(isTask, isEvent, viewType)}
            </>
        )
    }

    // Determine view to use in display
    const selectView = (isTask, isEvent, viewType) => {
        if (isTask === true) {
            return <Tasks settings={settings} viewType={viewType} />
        } 
        else if (isEvent === true) {
            return <Events settings={settings} viewType={viewType} />
        } 
        else if (viewType === 'groups') {
            return <Groups />

        } else if (viewType === 'settings') {
            return <Settings settings={settings} setSettings={setSettings}/>
        }
    }

    // If the settings are loaded display the view
    return (
        <>
            {areSettingsLoaded ? displayNavAndView() : ""}
        </>
    )
}

export default DisplayContainer;