import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = ({ children, isAuthenticated }) => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    };

    return (
        <Auxiliary>
            <Toolbar
                isAuth={isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer
                isAuth={isAuthenticated}
                open={sideDrawerIsVisible}
                closed={sideDrawerClosedHandler}
            />
            <main className={classes.Content}>
                {children}
            </main>
        </Auxiliary>
    )
}

const mapStateToProps = ({ auth: { token } }) => {
    return {
        isAuthenticated: token !== null
    }
};

export default connect(mapStateToProps)(Layout);
