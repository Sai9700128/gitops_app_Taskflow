import { createContext, useState, useEffect } from 'react';
import { authAPI, setAuthToken } from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    setAuthToken(token);
                    const response = await authAPI.getMe();
                    setUser(response.data);
                } catch (error) {
                    localStorage.removeItem('token');
                    setAuthToken(null);
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        const response = await authAPI.login({ email, password });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setAuthToken(token);
        setUser(user);
        return user;
    };

    const register = async (name, email, password) => {
        const response = await authAPI.register({ name, email, password });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setAuthToken(token);
        setUser(user);
        return user;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};