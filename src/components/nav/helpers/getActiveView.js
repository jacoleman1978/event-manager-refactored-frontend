// Called by NavMenu.js
/* 
-Sets display option for View and highlights active Nav button, if applicaple.
-isTask and isEvent are boolean values set in App.js Route
-viewType is a string set in App.js Route
-Returns an object with two properties with string values: dropdownTitle, defaultActive
*/
const getActiveView = (isTask, isEvent, viewType) => {
    let dropdownTitle = "";
    let defaultActive = "";

    if (isTask) {
        dropdownTitle = 'Tasks';

        if (viewType === 'priority') {
            defaultActive = '/tasks/priority';
        } else if (viewType === 'duedate') {
            defaultActive = '/tasks/duedate';
        } else if (viewType === 'new') {
            defaultActive = '/tasks/new';
        }

    } else if (isEvent) {
        dropdownTitle = 'Events';

        if (viewType === 'day') {
            defaultActive = '/events/day/0';
        } else if (viewType === 'new') {
            defaultActive = '/events/new/0'
        } else if (viewType === 'week') {
            defaultActive = '/events/week/0'
        }

    } else if (viewType === 'groups') {
        dropdownTitle = 'Groups';
    } else if (viewType === 'settings') {
        dropdownTitle = 'Settings';
    }

    return {dropdownTitle: dropdownTitle, defaultActive: defaultActive}
}

export default getActiveView;