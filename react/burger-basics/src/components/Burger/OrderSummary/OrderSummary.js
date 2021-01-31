import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = ({ ingredients, purchaseCanceled, purchaseContinued, price }) => {
    const ingredientSummary = Object.keys(ingredients)
        .map(igKey => (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {ingredients[igKey]}
            </li>
        ));

    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={purchaseContinued}>Continue</Button>
        </Auxiliary>
    );
};

export default orderSummary;
