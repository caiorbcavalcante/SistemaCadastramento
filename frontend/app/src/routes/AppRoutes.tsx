import  { BrowserRouter, Routes, Route } from 'react-router-dom';


export const AppRoutes = () => {
    <BrowserRouter>
    <Routes>

    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>

    </Routes>  
    </BrowserRouter>
}