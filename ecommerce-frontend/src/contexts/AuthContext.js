// src/contexts/AuthContext.js (مبسط)
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('access_token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            setUser(JSON.parse(userData));
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (username, password) => {
        setLoading(true);
        try {
            // For now, simulate login (replace with real API call later)
            const mockUser = {
                id: 1,
                username: username,
                first_name: 'مستخدم',
                email: 'user@example.com'
            };
            
            // Simulate API response
            localStorage.setItem('access_token', 'fake-token-' + Date.now());
            localStorage.setItem('user', JSON.stringify(mockUser));
            
            setUser(mockUser);
            setIsAuthenticated(true);
            
            return { success: true, message: 'تم تسجيل الدخول بنجاح!' };
            
        } catch (error) {
            return { success: false, message: 'حدث خطأ في تسجيل الدخول' };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            // For now, simulate registration
            const mockUser = {
                id: 1,
                username: userData.username,
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email
            };
            
            localStorage.setItem('access_token', 'fake-token-' + Date.now());
            localStorage.setItem('user', JSON.stringify(mockUser));
            
            setUser(mockUser);
            setIsAuthenticated(true);
            
            return { success: true, message: 'تم إنشاء الحساب بنجاح!' };
            
        } catch (error) {
            return { success: false, message: 'حدث خطأ في إنشاء الحساب' };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};