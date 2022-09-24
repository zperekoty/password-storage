import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { authUser, isAuth } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

const Auth = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { status, message } = useSelector((state) => state.auth);
    const auth = useSelector(isAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (status === 'error') {
            toast.error(message);
        }

        if (status === 'success') {
            toast.success(message);
        }

        if (status === 'pending') {
            toast.info(message);
        }

        if (auth) {
            navigate('/');
        }
    }, [status, message, auth, navigate]);

    const handle = () => {
        try {
            if (!login || !password) {
                return toast.error('Необходимо заполнить все поля.');
            }

            if (password.length < 8) {
                return toast.error('Длина пароля не может быть меньше 8 символов.');
            }

            dispatch(authUser( { login, password } ));
            setLogin('');
            setPassword('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="auth">
            <Navbar to="auth" />
            <div className="auth__inner">
                <div className="auth__type">
                    <h1 className="auth__text">Авторизация</h1>
                    <input type="text" value={ login } onChange={ e => setLogin(e.target.value) } className="auth__input" maxLength="25" placeholder="Логин" />
                    <input type="password" value={ password } onKeyUp={ e => { if (e.key === 'Enter') handle(); } } onChange={ e => setPassword(e.target.value) } className="auth__input" minLength="8" maxLength="20" placeholder="Пароль" />
                </div>
                
                <div className="auth__action">
                    <button className="auth__button" onClick={ handle }>Войти</button>
                    <NavLink to="/signup" className="auth__reg">Регистрация</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Auth;