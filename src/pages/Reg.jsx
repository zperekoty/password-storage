import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { isAuth, registerUser } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const Reg = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [telegram, setTelegram] = useState('');
    const [instagram, setInstagram] = useState('');
    const dispatch = useDispatch();
    const { status , message } = useSelector((state) => state.auth);
    const auth = useSelector(isAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (status === 'error') toast.error(message);

        if (status === 'success') toast.success(message);

        if (status === 'pending')  toast.info(message);

        if (auth) navigate('/');
    }, [status, message, auth, navigate]);

    const handle = () => {
        try {
            if (!login || !password || !name || !telegram || !instagram) {
                return toast.error('Необходимо заполнить все поля.');
            }

            if (password.length < 8) {
                return toast.error('Длина пароля должна быть не меньше 8 символов.');
            }

            dispatch(registerUser( { login, password, name, telegram, instagram } ));
            setLogin('');
            setPassword('');
            setName('');
            setTelegram('');
            setInstagram('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="reg">
            <Navbar to="reg" />
            <div className="reg__inner">
                <div className="reg__type">
                    <h1 className="reg__text">Регистрация</h1>
                    <input type="text" value={ login } onChange={ e => setLogin(e.target.value) } className="reg__input" maxLength="25" placeholder="Логин" />
                    <input type="text" value={ name } onChange={ e => setName(e.target.value) } className="reg__input" maxLength="30" placeholder="Имя" />
                    <input type="text" value={ telegram } onChange={ e => setTelegram(e.target.value) } className="reg__input" maxLength="20" placeholder="Имя пользователя telegram" />
                    <input type="text" value={ instagram } onChange={ e => setInstagram(e.target.value) } className="reg__input" maxLength="20" placeholder="Имя пользователя instagram" />
                    <input type="password" value={ password } onKeyUp={ e => { if (e.key === 'Enter') handle(); } } onChange={ e => setPassword(e.target.value) } className="reg__input" minLength="8" maxLength="20" placeholder="Пароль" />
                </div>
                
                <div className="reg__action">
                    <button className="reg__button" onClick={ handle }>Зарегистрироваться</button>
                    <NavLink to="/signin" className="reg__auth">Авторизация</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Reg;