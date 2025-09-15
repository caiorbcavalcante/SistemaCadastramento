import  { BrowserRouter, Routes, Route } from 'react-router-dom';
import {  HomePublic } from '../pages/homePublic/HomePublic';
import { Login } from '../pages/login/Login';
import RegisterAccount from '../pages/registerAccount/RegisterAccount'
import NotFound from '../pages/NotFound/NotFound';

export const AppRoutes:React.FC = () => {
    return(
    <BrowserRouter>
    <Routes>

    <Route path="/" element={<HomePublic/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<RegisterAccount/>}/>

    <Route path='*' element={<NotFound/>}/>
    </Routes>  
    </BrowserRouter>
    )
}