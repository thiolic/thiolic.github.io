import React, { useState } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { checkValidity } from '../../../shared/utility'
import * as orderActions from '../../../store/actions';

const ContactData = ({ ings, price, onOrderBurger, token, userId, loading }) => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (let formElementIdentifier in orderForm) {
            if (orderForm.hasOwnProperty(formElementIdentifier)) {
                formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
            }
        }

        const order = {
            ingredients: ings,
            price,
            orderData: formData,
            userId
        };

        onOrderBurger(order, token);
    };

    const inputChangedHandler = (value, inputIdentifier) => {
        const updatedOrderForm = {
            ...orderForm,
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm) {
            if (updatedOrderForm.hasOwnProperty(inputIdentifier)) {
                formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
            }
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    };

    const formElementsArray = [];

    for (let key in orderForm) {
        if (orderForm.hasOwnProperty(key)) {
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            });
        }
    }

    let form = (
        <form onSubmit={orderHandler}>
            {
                formElementsArray.map(({ id, config: { elementType, elementConfig, value, valid, validation, touched } }) => (
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
                ))
            }
            <Button btnType="Success" disabled={!formIsValid} clicked={orderHandler}>ORDER</Button>
        </form>
    );

    if (loading) {
        form = <Spinner />
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter you Contact Data</h4>
            {form}
        </div>
    );
}

const mapStateToProps = ({ burgerBuilder, order, auth }) => {
    const { ingredients, totalPrice } = burgerBuilder;
    const { loading } = order;
    const { token, userId } = auth;

    return {
        ings: ingredients,
        price: totalPrice,
        loading,
        token,
        userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
