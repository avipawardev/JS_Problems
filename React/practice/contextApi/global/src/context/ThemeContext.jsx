import { createContext, useState } from "react";

export const Theme = createContext();

export const ThemeProvider = ({children})=>{
    const [theme,setTheme] = useState(false)
    return (<Theme.Provider value={{theme,setTheme}}>
            {children}
            </Theme.Provider>)
}




