import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext() 

const AuthProvider = ({children}) => {
    useEffect(() => {
        const data = localStorage.getItem('auth');
        if(data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            })
        }
    },[])
    const[auth, setAuth] = useState({
        user: null,
        token: ""
    })
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

// custom hook
const useAuth = () => useContext(AuthContext)

export {useAuth, AuthProvider}