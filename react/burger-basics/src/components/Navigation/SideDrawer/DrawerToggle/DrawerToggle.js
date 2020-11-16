import React from 'react';

import classes from './DrawerToggle.module.css';

const drawerToggle = ({clicked}) => (
    <button className={classes.DrawerToggle} onClick={clicked}>
        <span></span>
        <span></span>
        <span></span>
    </button>
);

export default drawerToggle;
