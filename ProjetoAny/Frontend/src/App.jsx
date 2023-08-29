import React from "react";
import Layout from "./Components/Layout";
import { Routes, Route, Router } from 'react-router-dom';
import Login from "./Components/Login";
import Registration from "./Components/Registration";

export default function App() {

    return (
        <>
            
            <Routes>
                <Route path='/app/*' element={<Layout/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/registrar' element={<Registration/>}/>
            </Routes>
        </>
    )
}