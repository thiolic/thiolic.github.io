import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from "../../store/actions";

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        const { orders, loading } = this.props;
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
}

const mapStateToProps = ({ order: { orders, loading } }) => {
    return {
        orders,
        loading
    }
};

const mapDispatchToProps = dispatch => {
      return {
          onFetchOrders: () => dispatch(actions.fetchOrders())
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
