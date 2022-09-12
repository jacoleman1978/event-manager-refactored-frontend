import SettingsDataService from "../../../services/settingsDataService";

// Called from /auth/LoginForm.js, /auth/SignupForm.js
const getDefaultViewPath = async () => {
    let redirectPath = '';
    await SettingsDataService.GetSettings().then(res => {
        let defaultViews = res.data.settings.views;
        
        if (defaultViews.login === 'Events') {
            if (defaultViews.events === 'By List') {
                redirectPath = '/events/list/0';
            } else if (defaultViews.events === 'By Week') {
                redirectPath = '/events/week/0';
            } else if (defaultViews.events === 'By Day') {
                redirectPath = '/events/day/0';
            }
        } else if (defaultViews.login === 'Tasks') {
            if (defaultViews.tasks === 'By Priority') {
                redirectPath = '/tasks/priority';
            } else if (defaultViews.tasks === 'By Due Date') {
                redirectPath = '/tasks/duedate';
            }
        } else if (defaultViews.login === 'Settings') {
            redirectPath = '/settings';
        } else if (defaultViews.login === 'Groups') {
            redirectPath = '/groups';
        }

    })
    
    return redirectPath
}

export default getDefaultViewPath;