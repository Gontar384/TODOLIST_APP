import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
};

const PublicRoute = () => {
    return isAuthenticated() ? <Navigate to="/taskmanager/showall"/> : <Outlet />;
}

export default PublicRoute;