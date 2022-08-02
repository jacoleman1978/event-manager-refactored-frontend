import React, { useState, useEffect, useContext } from "react";
import ViewSettings from "./ViewSettings";
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
        <div>
            <ViewSettings settings={settings}/>
        </div>
    )
}

export default Settings;