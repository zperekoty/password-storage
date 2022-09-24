import React from 'react';
import { decodeToken } from 'react-jwt';
import { toast } from 'react-toastify';

const Passwords = ( { password, remove, update, modal, setVisible } ) => {
    const pass = decodeToken(password.password);

    const copy = (val) => {
        try {
            navigator.clipboard.writeText(val);
            toast.success(`Текст скопирован: ${ val }`);
        } catch (error) {
            toast.error(`Произошла ошибка: ${ error }`);
        }
    };

    const upd = () => {
        update( { name: password.name, url: password.url, username: password.username, password: pass.password, id: password._id } );
        modal('edit');
        setVisible(true);
    };

    const rmv = () => {
        remove( { id: password._id, } );
        modal('delete');
        setVisible(true);
    };

    return (
        <div className="passwords">
            <div className="passwords__inner">
                <span className="passwords__title">Название: <span onClick={ () => { copy(password.name) } } className="passwords__content">{ password.name }</span></span>
                <span className="passwords__title">Url: <a className="password__link" href={`https://${ password.url }`} target="_blank" rel="noopener noreferrer">{ password.url }</a></span>
                <span className="passwords__title">Логин: <span onClick={ () => { copy(password.username) } } className="passwords__content">{ password.username }</span></span>
                <span className="passwords__title">Пароль: <span onClick={ () => { copy(pass.password) } } className="passwords__content">{ pass.password }</span></span>

                <div className="passwords__btns">
                    <button className="btn__delete" onClick={ rmv }>Удалить пароль</button>
                    <button className="btn__edit" onClick={ upd }>Редактировать пароль</button>
                </div>
            </div>
        </div>
    );
};

export default Passwords;