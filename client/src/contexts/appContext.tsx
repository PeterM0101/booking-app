import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useQuery} from "@tanstack/react-query";
import * as apiClient from "../api-client";

export type ToastMessage = {
    message: string,
    type: 'SUCCESS' | "ERROR"
}

type AppContextType = {
    setToast: (toastMessage: ToastMessage) => void,
    setIsLoggedIn: (value: boolean)=>void,
    isLoggedIn: boolean
}

const initialAppContext: AppContextType = {
    setToast: ()=>{},
    setIsLoggedIn: () => {},
    isLoggedIn: false
}

const AppContext = createContext<AppContextType>(initialAppContext)

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = ({children}: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const {isError} = useQuery({
        queryKey: ['validateToken'],
        queryFn: apiClient.validateToken,
        retry: false
    })

    useEffect(() => {
        setIsLoggedIn(!isError);
    }, [isError]);

    const setToast = (toastMessage: ToastMessage) => {
        if (toastMessage.type === 'SUCCESS') {
            toast.success(toastMessage.message)
        } else {
            toast.error(toastMessage.message)
        }
    }
    return (
        <AppContext.Provider value={{setToast,
            setIsLoggedIn,
            isLoggedIn
        }}>
            {children}
        </AppContext.Provider>
    )
}