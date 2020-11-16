import React, { Component } from 'react';

import classes from './Layout.module.css';
import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    };

    render() {
        const { children } = this.props;
        const { showSideDrawer } = this.state;

        return (
            <Auxiliary>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {children}
                </main>
            </Auxiliary>
        )
    }
}

export default Layout;
