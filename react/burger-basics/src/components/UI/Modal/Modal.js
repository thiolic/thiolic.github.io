import React, { Component } from 'react';

import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps) {
        const { show, children } = this.props;
        return nextProps.show !== show || nextProps.children !== children;
    }

    render() {
        const { children, show, modalClosed } = this.props;

        return (
            <Auxiliary>
                <div
                    className={classes.Modal}
                    style={{
                        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: show ? '1' : '0'
                    }}
                >
                    {children}
                </div>
                <Backdrop show={show} clicked={modalClosed}/>
            </Auxiliary>
        );
    }
}

export default Modal;
