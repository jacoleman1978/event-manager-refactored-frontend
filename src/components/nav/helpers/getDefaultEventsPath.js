// Called by NavMenu.js
/*
-defaultView is a string from an enumerated list from SettingsSchema on the backend
-defaultView has the following options: 'By List', 'By Day', 'By Week'
-Returns a string representing the path to use when Events selected from Nav Views dropdown
*/
const getDefaultEventsPath = (defaultView) => {
    if (defaultView === 'By List') {
        return '/events/list/0';
    } else if (defaultView === 'By Day') {
        return '/events/day/0';
    } else if (defaultView === 'By Week') {
        return '/events/week/0';
    }
}

export default getDefaultEventsPath;