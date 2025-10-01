import React, { useState, createContext, useEffect, useContext, ReactNode} from "react";
import { jwtDecode } from 'jwt-decode'
import axios from "axios";


interface User{
    id: number;
    name: string;
    email: string; 
    number: string;
    role: 'user' | 'barber';
    adminplus?: boolean
}

interface AuthContextType{
    user: User | null;
    loading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined> (undefined);

export const AuthProvider = ({children}: { children: ReactNode}) => {
    const [user, setUser] = useState<User | null> (null);
    const [loading, setLoading] = useState<boolean> (true)

    useEffect(() => {
        const checkAuthStatus  = async () =>{
            const token = localStorage.getItem('token')

            if (token) {
                try {
                    const decodedToken = jwtDecode<{
                        id_barber?: number;
                        id_user?: number;
                        email: string;
                        role: 'user' | 'barber';
                        exp: number
                    }>(token)  

                    if (decodedToken.exp * 1000 > Date.now()){

                        const id = decodedToken.id_barber ?? decodedToken.id_user;
                        // if (decodedToken.id_barber){
                        //     setUserId(decodedToken.id_barber)
                        // } else if(decodedToken.id_user) {
                        //     setUserId(decodedToken.id_user)
                        const endpoint = decodedToken.id_barber ? "barbers" : "user";

                    const res = await axios.get(`http://localhost:3000/${endpoint}/${id}`, {
                        headers: {Authorization: `Bearer ${token}`}
                    })

                    setUser({
                        id,
                        name: res.data.name,
                        email: decodedToken.email,
                        role: decodedToken.role,
                        number: res.data.number,
                        adminplus: res.data.adminplus,
                    })
                } else {
                    localStorage.removeItem("token");
                }
                } catch (error) {
                    console.error("Token inválido ou expirado: ", error)
                    localStorage.removeItem('token')
                }
            }
            setLoading(false)
        }

        checkAuthStatus();
    }, [])

    const login = async (token: string) => {
        localStorage.setItem('token', token);
        setLoading(true);

        try {
            const decodedToken = jwtDecode<{
                id_user?: number;
                id_barber?: number;
                email: string;
                role: 'user' | 'barber';
            }>(token);

            const id = decodedToken.id_barber ?? decodedToken.id_user;
            const endpoint = decodedToken.id_barber? 'barbers' : 'user';

            const res = await axios.get(`http://localhost:3000/${endpoint}/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            })

            setUser ({
                id, 
                name: res.data.name,
                email: decodedToken.email,
                role: decodedToken.role,
                number: res.data.number,
                adminplus: res.data.adminplus
            })

        } catch (error) {
            console.log(error);
            localStorage.removeItem('token')
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
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
    