import React, { Component } from 'react';
import axios from '../../../axios-orders';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
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
                value: '',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        const { ingredients, price, history } = this.props;
        const { orderForm } = this.state;
        const formData = {};

        for (let formElementIdentifier in orderForm) {
            if (orderForm.hasOwnProperty(formElementIdentifier)) {
                formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
            }
        }

        this.setState({ loading: true });
        const order = {
            ingredients,
            price,
            orderData: formData
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    };

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (value, inputIdentifier) => {
        const { orderForm } = this.state;

        const updatedOrderForm = {
            ...orderForm,
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm) {
            if (updatedOrderForm.hasOwnProperty(inputIdentifier)) {
                formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
            }
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    };

    render() {
        const { loading, orderForm, formIsValid } = this.state;
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
            <form onSubmit={this.orderHandler}>
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
                            changed={({ target }) => this.inputChangedHandler(target.value, id)}
                        />
                    ))
                }
                <Button btnType="Success" disabled={!formIsValid} clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (loading) {
            form = <Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter you Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
