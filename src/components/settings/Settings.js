import React, { useState, useEffect, useContext } from "react";
import ViewSettings from "./ViewSettings";
import EventSettings from "./EventSettings";
import ChangePassword from "./ChangePassword";
import { CurrentUser } from "../../contexts/currentUser";
import SettingsDataService from "../../services/settingsDataService";


const Settings = () => {
    // Get currentUser from context
    const { currentUser } = useContext(CurrentUser);

    // State for user settings
    let [settings, setSettings] = useState(null);

    useEffect(() => {
        if (currentUser !== "undefined" && currentUser !== null) {    
            SettingsDataService.GetSettings().then(res => {setSettings(res.data.settings)});
        }
    }, [currentUser])

    return (
        <div className="flex-center-wrap">
            <ViewSettings settings={settings} />
            <EventSettings settings={settings} />
            <ChangePassword />
        </div>
    )
}

export default Settings;