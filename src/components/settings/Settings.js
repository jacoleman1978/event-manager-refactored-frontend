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
            <ViewSettings settings={settings} setSettings={setSettings}/>
            <EventSettings settings={settings} setSettings={setSettings}/>
            <ChangePassword />
        </div>
    )
}

export default Settings;