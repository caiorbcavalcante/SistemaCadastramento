import React, { useState, createContext, useEffect, useContext } from "react";
import { jwtDecode } from 'jwt-decode'


interface User{
    id: number;
    name: string;
    email: string; 
    number: number;
    role: 'user' | 'barber';
    adminplus?: boolean
}

interface AuthContextType{
    user: User | null;
    loading: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined> (undefined);

export const AuthProvider = ({children}: { children: ReactNode}) => {
    const [user, setUser] = useState<User | null> (null);
    const [loading, setLoading] = useState<boolean> (true)

    useEffect(() => {
        const checkAuthStatus  = async () =>{
            const token = localStorage.getItem('authToken')

            if (token) {
                try {
                    const decodedToken = jwtDecode<{
                        id_barber?: number;
                        id_user?: number;
                        name: string;
                        email: string;
                        role: 'user' | 'barber';
                        number: number,
                        adminplus?: boolean
                        exp: number
                    }>(token)  

                    if (decodedToken.exp * 1000 > Date.now()){
                        if (decodedToken.id_barber){
                            userId = decodedToken.id_barber
                        } else if(decodedToken.id_user) {
                            userId = decodedToken.id_user
                        } else {
                            throw new Error ("id do usuário não encontrado no token")
                        }
                    setUser({
                        id: userId,
                        name: decodedToken.name,
                        email: decodedToken.email,
                        role: decodedToken.role,
                        number: decodedToken.number,
                        adminplus: decodedToken.adminplus
                        
                    })
                } else {
                    localStorage.removeItem("authToken");
                }
                } catch (error) {
                    console.error("Token inválido ou expirado: ", error)
                    localStorage.removeItem('authToken')
                }
            }
            setLoading(false)
        }

        checkAuthStatus();
    }, [])

    const login = (token: string, userData: User) => {
        localStorage.setItem('authToken', token);
        setUser(userData);
    }

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null)
    }

    const value: AuthContextType = {
        user, 
        loading,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext); 

    if (context === undefined) {
        throw new Error ('useAuth deve ser utilizado dentro de um AuthProvider')
    }
    return context
}

export default AuthContext;
    