import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Modal = ( { form, handle, visible, setVisible, remove, update, oldPassword, rmvId } ) => {
    const [password, setPassword] = useState( { name: '', url: '', username: '', password: '' } );
    const [newPassword, setNewPassword] = useState( { name: '', url: '',
         username: '', password: '', id: '' } );
    const [rmv, setRmv] = useState( { id: '', });
    
    const createPass = () => {
        try {
            if (!password.name || !password.url || !password.username || !password.password) {
                return toast.error('Необходимо заполнить все поля.');
            }

            handle(password);
            setPassword( { name: '', url: '', username: '', password: '' } );
            setVisible(false);
        } catch (error) {
            console.log(error);
        }
    };

    const updatePass = () => {
        try {
            // if (oldPassword.name === password.name && oldPassword.url === password.url &&
            //     oldPassword.username === password.username && oldPassword.password === password.password) {
            //     return toast.error('Новые данные точно такие же, как и старые.');
            // }

            update(newPassword);
            // setNewPassword( { name: '', url: '', username: '', password: '' } );
            setVisible(false);
        } catch (error) {
            console.log(error);
        }
    };

    const removePass = () => {
        console.log(`rmv: ${ rmv.id }`);
        try {
            remove(rmv);
            setVisible(false);
        } catch (error) {
            console.log(error);
        }
    };

    const keyControl = key => {
        if (key === 'Enter') {
            createPass();
        }

        if (key === 'Escape') {
            setVisible(false);
        }
    };

    useEffect(() => {
        setNewPassword( { name: oldPassword.name, url: oldPassword.url, username: oldPassword.username,
        password: oldPassword.password, id: oldPassword.id } );
        setRmv( { id: rmvId.id } );
    }, [oldPassword, rmvId]);

    return (
        <div className="modal" style={ visible ? { visibility: 'visible', opacity: '1' } : { visibility: 'hidden', opacity: '0' } } onClick={ () => setVisible(false) }>
            { form === 'add' && (
                <div className="modal__inner" style={ visible ? { transform: 'translateY(0)' } : { transform: 'translateY(-100vh)' } } onClick={ e => e.stopPropagation() }>
                    <input className="modal__input" type="text" value={ password.name } onChange={ e => setPassword( { ...password, name: e.target.value } ) }  placeholder="Введите имя" />
                    <input className="modal__input" type="text" name="" value={ password.url } onChange={ e => setPassword( { ...password, url: e.target.value } ) } placeholder="Введите url" />
                    <input className="modal__input" type="text" value={ password.username } onChange={ e => setPassword( { ...password, username: e.target.value } ) } placeholder="Введите логин" />
                    <input className="modal__input" type="text" value={ password.password } onKeyUp={ e => keyControl(e.key) } onChange={ e => setPassword( { ...password, password: e.target.value } ) } placeholder="Введите пароль" />

                    <div className="modal__btns">
                        <button className="modal__btn" onClick={ createPass }>Добавить пароль</button>
                        <button className="modal__btn__close" onClick={ () => setVisible(false) }>Отмена</button>
                    </div>
                </div>
            )}

            { form === 'delete' && (
                <div className="modal__inner" style={ visible ? { transform: 'translateY(0)' } : { transform: 'translateY(-100vh)' } } onClick={ e => e.stopPropagation() }>
                    <h1>Вы уверены, что хотите удалить пароль?</h1>

                    <div className="modal__btns">
                        <button className="modal__btn" onClick={ removePass }>Да</button>
                        <button className="modal__btn__close" onClick={ () => setVisible(false) }>Отмена</button>
                    </div>
                </div>
            )}

            { form === 'edit' && (
                <div className="modal__inner" style={ visible ? { transform: 'translateY(0)' } : { transform: 'translateY(-100vh)' } } onClick={ e => e.stopPropagation() }>
                    <input className="modal__input" type="text" value={ newPassword.name } onChange={ e => setNewPassword( { ...newPassword, name: e.target.value } ) }  placeholder="Введите имя" />
                    <input className="modal__input" type="text" name="" value={ newPassword.url } onChange={ e => setNewPassword( { ...newPassword, url: e.target.value } ) } placeholder="Введите url" />
                    <input className="modal__input" type="text" value={ newPassword.username } onChange={ e => setNewPassword( { ...newPassword, username: e.target.value } ) } placeholder="Введите логин" />
                    <input className="modal__input" type="text" value={ newPassword.password } onKeyUp={ e => keyControl(e.key) } onChange={ e => setNewPassword( { ...newPassword, password: e.target.value } ) } placeholder="Введите пароль" />

                    <div className="modal__btns">
                        <button className="modal__btn" onClick={ updatePass }>Обновить пароль</button>
                        <button className="modal__btn__close" onClick={ () => setVisible(false) }>Отмена</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;