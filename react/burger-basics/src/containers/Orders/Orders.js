import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('orders.json')
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

                this.setState({ orders: fetchedOrders, loading: false });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

    render() {
        const { orders, loading } = this.state;
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

export default withErrorHandler(Orders, axios);
