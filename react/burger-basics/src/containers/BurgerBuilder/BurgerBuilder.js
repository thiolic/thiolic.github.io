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
        const { isAuthenticated, onSetRedirectPath, history } = this.props;

        if (isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            onSetRedirectPath('/checkout');
            history.push('/auth');
        }
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
        const { ings, onIngredientAdded, onIngredientRemoved, price, error, isAuthenticated } = this.props;
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
                        isAuth={isAuthenticated}
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

const mapStateToProps = ({ burgerBuilder: { ingredients, totalPrice, error }, auth: { token } }) => {
    return {
        ings: ingredients,
        price: totalPrice,
        error,
        isAuthenticated: token !== null
    };
};

const mapDispatchToProps = dispatch => {
    const { addIngredient, removeIngredient, initIngredients, purchaseInit, setAuthRedirectPath } = actions;

    return {
        onIngredientAdded: (ingredientName) => dispatch(addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(initIngredients()),
        onInitPurchase: () => dispatch(purchaseInit()),
        onSetRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
