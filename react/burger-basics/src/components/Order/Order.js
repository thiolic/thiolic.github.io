import React from 'react';

import classes from './Order.module.css';

const order = ({ ingredients, price }) => {
    const orderIngredients = [];

    for (let ingredientName in ingredients) {
        if (ingredients.hasOwnProperty(ingredientName)) {
            orderIngredients.push({
                name: ingredientName,
                amount: ingredients[ingredientName]
            });
        }
    }

    const ingredientOutput = orderIngredients.map(({ name, amount }) => {
        return <span key={name}>{name} ({amount})</span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(price).toFixed(2)}</strong></p>
        </div>
    )
};

export default order;
