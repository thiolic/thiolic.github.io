import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../shared/utility'

import classes from './Auth.module.css';
import { auth, setAuthRedirectPath } from '../../store/actions'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSingup: true
    };

    componentDidMount() {
        const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = this.props;

        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (value, controlName) => {
        const { controls } = this.state;

        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value,
                valid: checkValidity(value, controls[controlName].validation),
                touched: true
            }
        };

        this.setState({ controls: updatedControls });
    };

    submitHandler = (event) => {
        event.preventDefault();
        const { controls: { email, password }, isSingup } = this.state;
        const { onAuth } = this.props;

        onAuth(email.value, password.value, isSingup);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSingup: !prevState.isSingup };
        });
    };

    render() {
        const { controls, isSingup } = this.state;
        const { loading, error, isAuthenticated, authRedirectPath } = this.props;

        const formElementsArray = [];

        for (let key in controls) {
            if (controls.hasOwnProperty(key)) {
                formElementsArray.push({
                    id: key,
                    config: controls[key]
                });
            }
        }

        let form = formElementsArray.map(({ id, config: { elementType, elementConfig, value, valid, validation, touched } }) => (
            <Input
                key={id}
                elementType={elementType}
                elementConfig={elementConfig}
                value={value}
                invalid={!valid}
                shouldValidate={validation}
                touched={touched}
                changed={({ target }) => this.inputChangedHandler(target.value, id)}
            />
        ));

        if (loading) {
            form = <Spinner/>;
        }

        let errorMessage = null;

        if (error) {
            errorMessage = (
                <p>{error.message}</p>
            )
        }

        let authRedirect = null;

        if (isAuthenticated) {
            authRedirect = <Redirect to={authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {isSingup ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = ({ auth: { loading, error, token, authRedirectPath }, burgerBuilder: { building } }) => {
    return {
        loading,
        error,
        isAuthenticated: token !== null,
        buildingBurger: building,
        authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
