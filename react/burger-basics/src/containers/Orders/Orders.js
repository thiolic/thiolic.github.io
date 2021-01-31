import React, { useEffect } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from "../../store/actions";

const Orders = ({ onFetchOrders, token, userId, orders, loading }) => {
    useEffect(() => {
        onFetchOrders(token, userId);
    }, [onFetchOrders, token, userId]);

    let orderRender = <Spinner />;

    if (!loading) {
        orderRender = orders.map(({ id, ingredients, price }) => (
            <Order
                key={id}
                ingredients={ingredients}
                price={price}
            />
        ));
    }

    return (
        <div>
            {orderRender}
        </div>
    );
}

const mapStateToProps = ({ order: { orders, loading }, auth: { token, userId } }) => {
    return {
        orders,
        loading,
        token,
        userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
