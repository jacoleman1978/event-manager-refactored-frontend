import React, { createContext, useState, useEffect } from 'react';
import UserDataService from '../services/userDataService';

export const CurrentUser = createContext();

const CurrentUserProvider = ({children}) => {
    let [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const getLoggedInUser = async () => {
            UserDataService.CheckSessionUser().then(res => {
                setCurrentUser(res.data);
            });
        };
        
        getLoggedInUser();
    }, []);

    return (
        <CurrentUser.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider;