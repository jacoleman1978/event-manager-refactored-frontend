import React, { useEffect, useContext } from "react";
import ViewSettings from "./ViewSettings";
import EventSettings from "./EventSettings";
import ChangePassword from "./ChangePassword";
import { CurrentUser } from "../../contexts/currentUser";
import SettingsDataService from "../../services/settingsDataService";


const Settings = (props) => {
    // Get currentUser from context
    const { currentUser } = useContext(CurrentUser);

    // State for user settings
    let {settings, setSettings} = props;

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