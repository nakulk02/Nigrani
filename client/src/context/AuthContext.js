import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const lightMode = {
        toggle_label_color: "text-dark bg-gray-dark",
        text: "Enable dark mode",
        time: "light"
    }
    const darkMode =
    {
        toggle_label_color: "text-light bg-dark",
        text: "Disable dark mode",
        time: "dark",
    }
    const [user, setUser] = useState({});
    const [mode, setMode] = useState(lightMode);
    const [person, setPerson] = useState({
        username: "",
        password: "",
        money:""
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasPassedOTP, setHasPassedOTP] = useState(false);
    return (
        <AuthContext.Provider value={{
            mode, setMode, person, setPerson, user, setUser, isLoggedIn, setIsLoggedIn,hasPassedOTP,setHasPassedOTP
        }}>
            {children}
        </AuthContext.Provider>
    )
}
