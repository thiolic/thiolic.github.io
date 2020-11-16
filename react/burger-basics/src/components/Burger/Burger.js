import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = ({ingredients}) => {
    let transformedIngredients = Object.keys(ingredients).map((igKey) =>
        [...Array(ingredients[igKey])].map((_, i) =>
            <BurgerIngredient key={igKey + i} type={igKey}/>
        )).reduce((prev, current) => prev.concat(current), []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;
