import  { BrowserRouter, Routes, Route } from 'react-router-dom';
import {  HomePublic } from '../pages/homePublic/HomePublic';
import { Login } from '../pages/login/Login';
import RegisterAccount from '../pages/registerAccount/RegisterAccount'
import NotFound from '../pages/NotFound/NotFound';
import BarberEditProfile from '../pages/barberEditProfile/BarberEditProfile';
import ControlPanel from '../pages/controlPanel/ControlPanel';
import { UserPage } from '../pages/userPage/UserPage';
import BarberAdminPage from '../pages/barberAdminPage/BarberAdminPage';
import UserProfile from '../pages/userPage/profile/UserProfile';
import { ForgotPassword } from '../pages/login/ForgotPassword';
import { NewPassword } from '../pages/login/NewPassword';

export const AppRoutes:React.FC = () => {
    return(
    <BrowserRouter>
    <Routes>

    <Route path="/" element={<HomePublic/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<RegisterAccount/>}/>
    <Route path="/user" element={<UserPage/>}/>
    <Route path="/userProfile" element={<UserProfile/>}/>
    <Route path='/controlPanel' element={<ControlPanel/>}/>
    <Route path='/barberEditProfile' element={<BarberEditProfile/>}/>
    <Route path='/controlPanel/admin' element={<BarberAdminPage/>}/>
    <Route path='/reset-password' element={<ForgotPassword/>}/>
    <Route path='/new-password' element={<NewPassword/>}/>
    

    <Route path='*' element={<NotFound/>}/>
    </Routes>  
    </BrowserRouter>
    )
}