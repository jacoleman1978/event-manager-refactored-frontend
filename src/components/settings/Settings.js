import React, { useEffect, useContext } from "react";
import ViewSettings from "./ViewSettings";
import EventSettings from "./EventSettings";
import ChangePassword from "./ChangePassword";
import { CurrentUser } from "../../contexts/currentUser";
import SettingsDataService from "../../services/settingsDataService";

// Called from DisplayContainer.js
const Settings = ({settings, setSettings}) => {
    const { currentUser } = useContext(CurrentUser);

    useEffect(() => {
        if (settings === null) {    
            SettingsDataService.GetSettings().then(res => {setSettings(res.data.settings)});
        }
    }, [currentUser])

    return (
        <div className="flex-center-wrap">
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
    )
}

export default Settings;