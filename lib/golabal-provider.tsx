import {createContext, useContext} from "react";
import {useAppwrite} from "@/lib/useAppwrite";
import {getUser} from "@/lib/appwrite";

interface User{
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User |null;
    loading : boolean;
    refetch: (neParams? : Record<string, string | number >) => Promise<void>;
}

export const GlobalConetext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({children}: {children: React.ReactNode}) => {
    const {
        data: user,
        loading,
        refetch,
    } = useAppwrite({
        fn: getUser,
    });
    const isLoggedIn = !!user;
    // console.log("inGlobal",JSON.stringify(user, null, 2))
    return (
        <GlobalConetext.Provider value={{user, isLoggedIn, loading, refetch}}>
            {children}
        </GlobalConetext.Provider>
    )
}

export const useGlobalContext = (): GlobalContextType =>{
const context = useContext(GlobalConetext)
if(!context) {
    throw new Error('useGlobalContext must be used within GlobalProvider')
}
return context;
}

export default GlobalProvider;