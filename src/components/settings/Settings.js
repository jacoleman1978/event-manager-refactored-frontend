import React, { useEffect, useContext } from "react";
import { CurrentUser } from "../../contexts/currentUser";
import SettingsDataService from "../../services/settingsDataService";
import ViewSettings from "./ViewSettings";
import EventSettings from "./EventSettings";
import ChangePassword from "./ChangePassword";

// Called from DisplayContainer.js
// A wrapper for the different components of settings
const Settings = ({settings, setSettings}) => {
    const { currentUser } = useContext(CurrentUser);

    // Retrieve the user's settings document
    useEffect(() => {
        if (settings === null) {    
            SettingsDataService.GetSettings().then(res => {setSettings(res.data.settings)});
        }
    }, [currentUser])

    return (
        <div className="flex-centered">
            <div className="tan-container-row-wrap">
                <div>
                    <p className="title">View Defaults:</p>
                    <ViewSettings settings={settings} setSettings={setSettings}/>
                </div>
                
                <div>
                    <p className="title">Event and Task Defaults:</p>
                    <EventSettings settings={settings} setSettings={setSettings}/>
                </div>
                
                <div>
                    <p className="title">Change Password:</p>
                    <ChangePassword />
                </div>
                
            </div>
        </div>
    )
}

export default Settings;