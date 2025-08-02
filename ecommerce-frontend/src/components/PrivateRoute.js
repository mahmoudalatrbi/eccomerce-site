// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    const { t } = useTranslation();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">{t('loading')}</span>
                    </div>
                    <p className="text-muted">{t('loading')}...</p>
                </div>
            </div>
        );
    }

    return isAuthenticated ? 
        children : 
        <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

export default PrivateRoute;