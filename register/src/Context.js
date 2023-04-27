import React, { createContext, useState } from "react";
export const UserContext = createContext();

export const UserProvider = ({ chidldren }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <UserContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            {chidldren}
        </UserContext.Provider>
    )
}