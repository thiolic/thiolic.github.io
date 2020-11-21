import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    };

    componentWillMount() {
        const { location: { search } } = this.props;
        const ingredients = {};
        let price = 0;
        const query = new URLSearchParams(search).entries();

        for(let param of query) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({
            ingredients: ingredients,
            totalPrice: price
        })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        const { ingredients, totalPrice } = this.state;
        const { match: { path } } = this.props;

        return (
            <div>
                <CheckoutSummary
                    ingredients={ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route
                    path={path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={ingredients} price={totalPrice} {...props} />)}
                />
            </div>
        );
    }
}

export default Checkout;
