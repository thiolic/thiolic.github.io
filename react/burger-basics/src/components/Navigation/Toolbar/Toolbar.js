import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = ({ drawerToggleClicked, isAuth }) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={drawerToggleClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={isAuth} />
        </nav>
    </header>
);

export default toolbar;
