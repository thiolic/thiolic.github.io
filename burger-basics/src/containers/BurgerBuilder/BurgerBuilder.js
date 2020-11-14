import React, { Component } from 'react';
import axios from '../../axios-orders';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.6
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => sum + el, 0);
        this.setState({purchasable: sum > 0})
    };

    addIngredientHandler = (type) => {
        const {ingredients, totalPrice} = this.state;
        const updatedIngredients = {...ingredients};
        // Updated count
        updatedIngredients[type] = ingredients[type] + 1;
        // Adds the cost of a new ingredient to the total amount
        const newPrice = totalPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const {ingredients, totalPrice} = this.state;
        if (ingredients[type] <= 0) {
            return;
        }
        const updatedIngredients = {...ingredients};
        updatedIngredients[type] = ingredients[type] - 1;
        const newPrice = totalPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        const { ingredients, totalPrice } = this.state;
        this.setState({ loading: true });
        const order = {
            ingredients,
            totalPrice,
            customer: {
                name: 'Sanya',
                address: {
                    street: 'Centralnaia',
                    zipCode: '1551',
                    country: 'Ukraine'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });
    };

    render() {
        const { ingredients, totalPrice, purchasable, purchasing, loading, error } = this.state;
        const disabledInfo = {...ingredients};

        for (let key in disabledInfo) {
            if (disabledInfo.hasOwnProperty(key)) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
        }

        let orderSummary = null;

        let burger = error ? <p>Ingredients can not be loaded</p> : <Spinner />;

        if (ingredients) {
            orderSummary = <OrderSummary
                ingredients={ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={totalPrice}
            />;

            burger = (
                <Auxiliary>
                    <Burger ingredients={ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={purchasable}
                        ordered={this.purchaseHandler}
                        price={totalPrice}
                    />
                </Auxiliary>
            );
        }

        if (loading) {
            orderSummary = <Spinner />
        }

        return (
            <Auxiliary>
                <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
