import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import Passwords from '../components/Passwords';
import { isAuth } from '../redux/features/auth/authSlice';
import { createPassword, deletePassword, updatePassword } from '../redux/features/password/passwordSlice';
import axios from '../utils/axios';

const Main = () => {
    const [passwords, setPasswords] = useState([]);
    const dispatch = useDispatch();
    const auth = useSelector(isAuth);
    const navigate = useNavigate();
    const [uName, setUName] = useState();
    const [uTg, SETUTg] = useState();
    const [uIg, SETUIg] = useState();
    const [modal, setModal] = useState(false);
    const { status, message } = useSelector((state) => state.password);
    const [form, setForm] = useState('');
    const [old, setOld] = useState( {} );
    const [rmvId, setRmvId] = useState( {} );

    const getPasswords = async () => {
        try {
            const { data } = await axios.get('/passwords');
            setPasswords(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getUser = async () => {
        try {
            const { data } = await axios.get('/passwords/user');
            setUName(data.name);
            SETUTg(data.tg);
            SETUIg(data.ig);
        } catch (error) {
            console.log(error);
        }
    };

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
            getPasswords();
            getUser();
        } else {
            navigate('/signin');
        }
    }, [status, message, auth, navigate]);

    const remove = async ( { id } ) => {
        console.log( { id } );
        try {
            dispatch(deletePassword( { id } ));
        } catch (error) {
            console.log(error);
        }
    };

    const remove$ = (id) => {
        setRmvId(id);
    };

    const update = async ( { name, url, username, password, id } ) => {
        try {
            dispatch(updatePassword( { name, url, username, password, id } ));
        } catch (error) {
            console.log(error);
        }
    };

    const update$ = (pass) => {
        setOld(pass);
    };

    const handle = (pass) => {
        try {
            dispatch(createPassword(pass));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="main">
            <Modal form={ form } visible={ modal } setVisible={ setModal } handle={ handle } update={ update } oldPassword={ old } rmvId={ rmvId } remove={ remove } />
            <Navbar to="main" name={ uName } tg={ uTg } ig={ uIg } />
            <div className="main__inner">
                <div className="main__inputs">
                    <button className="main__btn" onClick={ () => { setForm('add'); setModal(true); } }>Добавить пароль</button>
                </div>

                { passwords?.map((password) => <Passwords modal={ setForm } setVisible={ setModal } update={ update$ } remove={ remove$ } key={ password._id } password={ password } />) }
            </div>
        </div>
    );
};

export default Main;