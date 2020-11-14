import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount() {
            axios.interceptors.request.use(request => {
                this.setState({ error: null });
                return request;
            });
            axios.interceptors.response.use(response => response, error => {
                this.setState({ error });
            });
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });

        };

        render() {
            const { error } = this.state;
            return (
                <Auxiliary>
                    <Modal
                        show={error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }
};

export default withErrorHandler;
