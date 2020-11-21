import React from 'react';
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.module.css';

const navigationItem = ({ children, link, exact }) => (
    <li className={classes.NavigationItem}>
        <NavLink
            activeClassName={classes.active}
            exact={exact}
            to={link}
        >
            {children}
        </NavLink>
    </li>
);

export default navigationItem;
