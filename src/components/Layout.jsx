import React from 'react';
import Navbar from './Navbar';

const Layout = ( { children } ) => {
    return (
        <React.Fragment>
            <div className="layout">
                <Navbar tg="zperekoty" ig="z.perekoty" />
                { children }
            </div>
        </React.Fragment>
    );
};

export default Layout;