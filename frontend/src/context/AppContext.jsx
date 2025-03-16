import { createContext } from "react";
import { prices } from "../assets/assets";


export const AppContext = createContext()

const AppContextProvider = (props) => {


    const value = {
        prices
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider