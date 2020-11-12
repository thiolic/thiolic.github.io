import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.6
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

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
        // this.setState({purchasing: false});
    };

    render() {
        const { ingredients, totalPrice, purchasable, purchasing } = this.state;
        const disabledInfo = {...ingredients};

        for (let key in disabledInfo) {
            if (disabledInfo.hasOwnProperty(key)) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
        }

        return (
            <Auxiliary>
                <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={ingredients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={totalPrice}
                    />
                </Modal>
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
}

export default BurgerBuilder;
