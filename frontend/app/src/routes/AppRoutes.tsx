import  { BrowserRouter, Routes, Route } from 'react-router-dom';
import {  HomePublic } from '../pages/homePublic/HomePublic';
import { Login } from '../pages/login/Login';


export const AppRoutes:React.FC = () => {
    return(
    <BrowserRouter>
    <Routes>

    <Route path="/" element={<HomePublic/>}/>
    <Route path="/login" element={<Login/>}/>

    </Routes>  
    </BrowserRouter>
    )
}