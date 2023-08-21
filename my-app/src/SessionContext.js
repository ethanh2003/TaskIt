import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);

    const setSessionUserId = (userId) => {
        sessionStorage.setItem('userId', userId);
        setUserId(userId);
    };

    const setSessionToken = (token) => {
        sessionStorage.setItem('token', token);
        setToken(token);
    };

    return (
        <SessionContext.Provider value={{ userId, token, setSessionUserId, setSessionToken }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    return useContext(SessionContext);
};
