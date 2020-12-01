import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from "../../axios-orders";
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => sum + el, 0);

        return sum > 0;
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        const { history, onInitPurchase } = this.props;

        onInitPurchase();
        history.push('/checkout');
    };

    render() {
        const { ings, onIngredientAdded, onIngredientRemoved, price, error } = this.props;
        const { purchasing } = this.state;
        const disabledInfo = { ...ings };

        for (let key in disabledInfo) {
            if (disabledInfo.hasOwnProperty(key)) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
        }

        let orderSummary = null;

        let burger = error ? <p>Ingredients can not be loaded</p> : <Spinner/>;

        if (ings) {
            orderSummary = <OrderSummary
                ingredients={ings}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={price}
            />;

            burger = (
                <Auxiliary>
                    <Burger ingredients={ings}/>
                    <BuildControls
                        ingredientAdded={onIngredientAdded}
                        ingredientRemoved={onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(ings)}
                        ordered={this.purchaseHandler}
                        price={price}
                    />
                </Auxiliary>
            );
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    const { addIngredient, removeIngredient, initIngredients, purchaseInit } = actions;

    return {
        onIngredientAdded: (ingredientName) => dispatch(addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(initIngredients()),
        onInitPurchase: () => dispatch(purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
