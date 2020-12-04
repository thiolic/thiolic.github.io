import * as actionType from './actionTypes';
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAIL,
        error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json?=auth' + token, orderData)
            .then(({ data }) => {
                dispatch(purchaseBurgerSuccess(data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionType.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionType.FETCH_ORDERS_SUCCESS,
        orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionType.FETCH_ORDERS_FAIL,
        error
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionType.FETCH_ORDERS_START
    }
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());

        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

        axios.get('orders.json' + queryParams)
            .then(({ data }) => {
                const fetchedOrders = [];

                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        fetchedOrders.push({
                            ...data[key],
                            id: key
                        });
                    }
                }

                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            });
    }
};
