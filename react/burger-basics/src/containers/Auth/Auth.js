import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../shared/utility'

import classes from './Auth.module.css';
import { auth, setAuthRedirectPath } from '../../store/actions'

const Auth = ({ buildingBurger, authRedirectPath, onSetAuthRedirectPath, loading, error, isAuthenticated, onAuth }) => {
    const [authForm, setAuthForm] = useState({
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
    });

    const [isSingup, setIsSingup] = useState(true);

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

    const inputChangedHandler = (value, controlName) => {
        const updatedControls = {
            ...authForm,
            [controlName]: {
                ...authForm[controlName],
                value,
                valid: checkValidity(value, authForm[controlName].validation),
                touched: true
            }
        };

        setAuthForm(updatedControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const { email, password } = authForm;

        onAuth(email.value, password.value, isSingup);
    };

    const switchAuthModeHandler = () => {
        setIsSingup(!isSingup);
    };

    const formElementsArray = [];

    for (let key in authForm) {
        if (authForm.hasOwnProperty(key)) {
            formElementsArray.push({
                id: key,
                config: authForm[key]
            });
        }
    }

    let form = formElementsArray.map((
        {
            id,
            config: { elementType, elementConfig, value, valid, validation, touched }

        }) => (
        <Input
            key={id}
            elementType={elementType}
            elementConfig={elementConfig}
            value={value}
            invalid={!valid}
            shouldValidate={validation}
            touched={touched}
            changed={({ target }) => inputChangedHandler(target.value, id)}
        />
    ));

    if (loading) {
        form = <Spinner />;
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
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button
                clicked={switchAuthModeHandler}
                btnType="Danger">SWITCH TO {isSingup ? 'SIGNIN' : 'SIGNUP'}
            </Button>
        </div>
    );
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
