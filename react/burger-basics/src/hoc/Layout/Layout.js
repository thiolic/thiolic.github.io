import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        const { children, isAuthenticated } = this.props;
        const { showSideDrawer } = this.state;

        return (
            <Auxiliary>
                <Toolbar
                    isAuth={isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={isAuthenticated}
                    open={showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                <main className={classes.Content}>
                    {children}
                </main>
            </Auxiliary>
        )
    }
}

const mapStateToProps = ({ auth: { token } }) => {
    return {
        isAuthenticated: token !== null
    }
};

export default connect(mapStateToProps)(Layout);
