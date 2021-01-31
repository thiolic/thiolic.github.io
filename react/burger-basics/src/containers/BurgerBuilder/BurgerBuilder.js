import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from "../../axios-orders";
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { addIngredient, removeIngredient, initIngredients, purchaseInit, setAuthRedirectPath } from '../../store/actions/index';

const BurgerBuilder = ({ history }) => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector(({ burgerBuilder }) => burgerBuilder.ingredients);
    const price = useSelector(({ burgerBuilder }) => burgerBuilder.totalPrice);
    const error = useSelector(({ burgerBuilder }) => burgerBuilder.error);
    const isAuthenticated = useSelector(({ auth }) => auth.token !== null);

    const onIngredientAdded = ingredientName => dispatch(addIngredient(ingredientName));
    const onIngredientRemoved = (ingredientName) => dispatch(removeIngredient(ingredientName));
    const onInitIngredients = useCallback(() => dispatch(initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(purchaseInit());
    const onSetRedirectPath = (path) => dispatch(setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);


    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => sum + el, 0);

        return sum > 0;
    };

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetRedirectPath('/checkout');
            history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        history.push('/checkout');
    };

    const disabledInfo = { ...ings };

    for (let key in disabledInfo) {
        if (disabledInfo.hasOwnProperty(key)) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
    }

    let orderSummary = null;

    let burger = error ? <p>Ingredients can not be loaded</p> : <Spinner />;

    if (ings) {
        orderSummary = <OrderSummary
            ingredients={ings}
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            price={price}
        />;

        burger = (
            <Auxiliary>
                <Burger ingredients={ings} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    price={price}
                    isAuth={isAuthenticated}
                />
            </Auxiliary>
        );
    }

    return (
        <Auxiliary>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliary>
    );
}

export default withErrorHandler(BurgerBuilder, axios);
