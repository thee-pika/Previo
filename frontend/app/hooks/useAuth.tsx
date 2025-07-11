"use client";

import { createContext, useContext, useEffect, useState } from "react";
import UserT from "../interfaces/User";
import useLocalStorage from "./use-local-storage";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    user: UserT | null;
    loading: boolean;
    login: (accessToken: string, refreshToken: string, user: UserT) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [accessToken, setAccessToken] = useLocalStorage<string | null>('accessToken', null);
    const [refreshToken, setRefreshToken] = useLocalStorage<string | null>('refreshToken', null);
    const [user, setUser] = useState<UserT | null>(null);
    const [loading, setLoading] = useState(false);

    const login = async (accessToken: string, refreshToken: string, user: UserT) => {
        try {
            setLoading(true);
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            setUser(user);
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        try {
            setLoading(true);
            if (accessToken) {
                try {
                    const userDecoded = jwtDecode<{ user: UserT }>(accessToken);
                    setUser(userDecoded.user);
                } catch (error) {
                    console.error("Invalid token, logging out", error);
                    logout();
                }
            }
        } catch (error) {
            console.error("Invalid token, logging out", error);
            logout();
        } finally {
            setLoading(false);
        }
    }, [accessToken])

    const logout = async () => {
        try {
            setLoading(true);
            setAccessToken(null);
            setRefreshToken(null);
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}


export default useAuth;