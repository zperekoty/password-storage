import React, { useEffect } from 'react';
import './css/style.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Auth from './pages/Auth';
import Reg from './pages/Reg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { get } from './redux/features/auth/authSlice';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get());
    }, [dispatch]);

    return (
        <div>
            <Routes>
                <Route path='/' element={ <Main /> } />
                <Route path='signin' element={ <Auth /> } />
                <Route path='signup' element={ <Reg /> } />
            </Routes>

            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default App;