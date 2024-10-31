import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
};

const PrivateRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;