import React from 'react';


const SocialLink = (props) => {
    return (
        <a href={ props.href } className="social__link" target={ props.way }>
            <img src={ props.src } alt="" className='social__logo' />
        </a>
    );
};

export default SocialLink;