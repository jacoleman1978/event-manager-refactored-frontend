import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "../contexts/currentUser";
import UserDataService from "../services/userDataService";
import SettingsDataService from "../services/settingsDataService";
import TasksByPriority from "./tasks/TasksByPriority";
import TasksByDueDate from "./tasks/TasksByDueDate";
import EventsByList from "./byListAndByDay/EventsByList";
import EventsByOverview from "./byOverview/EventsByOverview";
import EventsByDay from "./byListAndByDay/EventsByDay";
import Groups from "./groups/Groups";
import Settings from "./settings/Settings";
import NavMenu from "./nav/NavMenu";
import NewTask from "./tasks/NewTask";

const DisplayContainer = (props) => {
    const navigate = useNavigate();

    // Get currentUser from context
    const { currentUser } = useContext(CurrentUser);

    // Props
    const { isTask, isEvent, viewType } = props;

    let [settings, setSettings] = useState(null);
    let [settingsLoaded, setSettingsLoaded] = useState(false);

    useEffect(() => {
        if (settings !== null) {
            setSettingsLoaded(true);
        }

        if (currentUser === null) {
            UserDataService.CheckSessionUser().then(res => {
                if (res.data === null) {
                    navigate('/auth/login');
                }
            })
        } 
    }, [settings])

    if (settings === null) {
        SettingsDataService.GetSettings().then(res => {
            setSettings(res.data.settings);
        })
    }

    const displayNavMenu = () => {
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
            if (viewType === 'priority') {
                return <TasksByPriority settings={settings} />
            } else if (viewType === 'duedate') {
                return <TasksByDueDate settings={settings} />
            } else if (viewType === 'new') {
                return <NewTask settings={settings} isEdit={false}/>
            } else if (viewType === 'edit') {
                return <NewTask settings={settings} isEdit={true}/>
            }

        } else if (isEvent === true) {
            if (viewType === 'list') {
                return <EventsByList />
            } else if (viewType === 'overview') {
                return <EventsByOverview />
            } else if (viewType === 'day') {
                return <EventsByDay />
            }

        } else if (viewType === 'groups') {
            return <Groups />

        } else if (viewType === 'settings') {
            return <Settings settings={settings} setSettings={setSettings}/>
        }
    }

    return (
        <>
            {settingsLoaded === true ? displayNavMenu() : ""}
            
        </>
    )
}

export default DisplayContainer;