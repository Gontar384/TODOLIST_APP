import React from 'react';
import Register from "./Components/RegisterLogin/Register.jsx";
import Login from "./Components/RegisterLogin/Login.jsx";
import TaskAdd from "./Components/TaskAdd/TaskAdd.jsx";
import TaskDisplay from "./Components/TaskDisplay/TaskDisplay.jsx";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import PublicRoute from "./Components/PublicRoute.jsx";
import AppUserInfo from "./Components/AppUserInfo/AppUserInfo.jsx";


function App() {

    return (
        <Router>
            <Routes>

                <Route element={<PublicRoute/>}>
                    <Route exact path="/register" element={<Register/>}/>
                    <Route exact path="/login" element={<Login/>}/>
                </Route>

                <Route element={<PrivateRoute/>}>
                    <Route exact path="/taskmanager/add" element={<TaskAdd/>}/>
                    <Route exact path="/taskmanager/showall" element={<TaskDisplay/>}/>
                    <Route exact path="/user/info" element={<AppUserInfo/>}/>
                </Route>

                <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
        </Router>
    );
}

export default App;
