import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";

const Checkout = ({ history, ings, purchased, match: { path } }) => {
    const checkoutCancelledHandler = () => {
        history.goBack();
    };

    const checkoutContinuedHandler = () => {
        history.replace('/checkout/contact-data');
    };

    let summary = <Redirect to="/" />;

    if (ings) {
        const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={ings}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                />
                <Route
                    path={path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        );
    }

    return summary;
}

const mapStateToProps = ({ burgerBuilder, order }) => {
    const { ingredients } = burgerBuilder;
    const { purchased } = order;

    return {
        ings: ingredients,
        purchased
    };
};

export default connect(mapStateToProps)(Checkout);
