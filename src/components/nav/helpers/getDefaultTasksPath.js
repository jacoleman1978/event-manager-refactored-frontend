/*
-defaultView is a string from an enumerated list from SettingsSchema on the backend
-defaultView has the following options: 'By Priority', 'By Due Date'
-Returns a string representing the path to use when Tasks selected from Nav Views dropdown
*/
const getDefaultTasksPath = (defaultView) => {
    if (defaultView === 'By Priority') {
        return '/tasks/priority';
    } else if (defaultView === 'By Due Date') {
        return '/tasks/duedate';
    }
}

export default getDefaultTasksPath;