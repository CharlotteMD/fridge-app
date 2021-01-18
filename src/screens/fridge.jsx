import React, {useState, useEffect} from 'react';
import {writeRecipe, recipeData} from '../App';


export const Fridge = () => {

    function submitRecipe() {
        writeRecipe('Risotto', 'risotto rice')
        writeRecipe('Tuna Pasta', ['tuna', 'pasta', 'tomatoes'])
        writeRecipe('Spaghetti Bolognaise', ['mince', 'tomatoes', 'onions', 'pasta'])
        writeRecipe('Risotto', 'risotto rice')
    }

    return (
        <>
            <h2>What's in the fridge?</h2>
            {/* <p>{data[0]}</p> */}
            <form>
                <div>
                    <input type="checkbox" id="tomatoes" name="tomatoes" value="tomatoes"/>
                    <label htmlFor="tomatoes">Tomatoes</label>
                </div>
                <div>
                    <input type="checkbox" id="onions" name="onions" value="onions"/>
                    <label htmlFor="onions">Onions</label>
                </div>
                <div>
                    <input type="checkbox" id="pasta" name="pasta" value="pasta"/>
                    <label htmlFor="pasta">Pasta</label>
                </div>
                <div>
                    <input type="checkbox" id="potatoes" name="potatoes" value="potatoes"/>
                    <label htmlFor="potatoes">Potatoes</label>
                </div>
                <div>
                    <button type="submit" onSubmit={submitRecipe()}>Feed Me</button>
                </div>
            </form>
        </>
    )
};