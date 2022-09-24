import React from 'react';
import { NavLink } from 'react-router-dom';

const Button = (props) => {
    return (
        <NavLink className="button" to={ props.to }>
            { props.text }
        </NavLink>
    );
};

export default Button;