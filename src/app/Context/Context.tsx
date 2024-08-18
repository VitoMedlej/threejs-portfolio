"use client"
import { createContext, useContext, useEffect, useState } from "react";


export const FullScreenContext = createContext < any > ({});



 const ContextWrapper  = ({children}:  {
        children: React.ReactNode;
      }
      ) => {
        const [isfullscreen,
            setFullScreen] = useState(false);


            return (
                <FullScreenContext.Provider value={{isfullscreen,setFullScreen}}>
            {children}
    </FullScreenContext.Provider>
            )
        }

export default ContextWrapper

export const useFullscreen = () => useContext(FullScreenContext);
