import React from 'react';
import Logo from '../img/logo.svg';
import Tg from '../img/tg.svg';
import Ig from '../img/ig.svg';
import SocialLink from './SocialLink';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Navbar = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handle = () => {
        dispatch(logout());
        window.localStorage.removeItem('jwtoken');
        navigate('/signin');
        toast.success('Вы успешно вышли.');
    };

    return (
        <div className="navbar">
            { props.to === 'main' && (
                <div className="navbar__inner">
                    <div className="navbar__logo">
                        <img src={ Logo } alt="" className="navbar-logo" />
                        <h1 className="navbar__name">{ props.name }</h1>
                    </div>

                    <div className="navbar__social">
                        <SocialLink href={ 'tg://resolve?domain=' + props.tg } src={ Tg } />
                        <SocialLink href={ 'https://instagram.com/' + props.ig } src={ Ig } way="_blank" />
                        <button className="logout__btn" onClick={ handle }>Выйти</button>
                    </div>
                </div>
            )}

            { props.to === 'reg' && (
                <div className="navbar__inner">
                    <div className="navbar__logo">
                        <img src={ Logo } alt="" className="navbar-logo" />
                        <h1 className="navbar__name">Password-Storage</h1>
                    </div>

                    <div className="navbar__credits">
                        <h1 className="navbar__credit">&copy; Захар Перекотий | 2022</h1>
                    </div>
                </div>
            )}

            { props.to === 'auth' && (
                <div className="navbar__inner">
                    <div className="navbar__logo">
                        <img src={ Logo } alt="" className="navbar-logo" />
                        <h1 className="navbar__name">Password-Storage</h1>
                    </div>

                    <div className="navbar__credits">
                        <h1 className="navbar__credit">&copy; Захар Перекотий | 2022</h1>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;