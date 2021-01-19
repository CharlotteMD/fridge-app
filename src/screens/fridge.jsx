import React, {useState, useEffect} from 'react';
import {writeRecipe} from '../App';


export const Fridge = (data) => {
    const [isLoading, setIsLoading] = useState(true);
    const [fridgeData, setFridgeData] = useState();
    const [ingredientsList, setIngredientsList] = useState();

    function getIngredients() {
        let allRecipeIngredients = [];
        Object.keys(fridgeData).map(function(key) {
            const recipeIngredients = fridgeData[key].ingredients;
            let howMany = Array.isArray(recipeIngredients);

            if (howMany) {
                recipeIngredients.map(ingredients => {
                    allRecipeIngredients.push(ingredients)
                })
            } else {
                allRecipeIngredients.push(recipeIngredients);
            }
            const noDuplicates = allRecipeIngredients.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
            setIngredientsList(noDuplicates);
          })
    }
  
    useEffect(() => {
      if (data) {
        setFridgeData(data.data.data)
      }
    }, [data])

    useEffect(() => {
        if (fridgeData) {
            setIsLoading(false);
            getIngredients()
        }
    }, [fridgeData])

    function submitRecipe() {
        writeRecipe('Risotto', 'risotto rice')
        writeRecipe('Tuna Pasta', ['tuna', 'pasta', 'tomatoes'])
        writeRecipe('Spaghetti Bolognaise', ['mince', 'tomatoes', 'onions', 'pasta'])
        writeRecipe('Risotto', 'risotto rice')
    }

    return (
        <>
            <h2>What's in the fridge?</h2>
            { isLoading && (
        <p>Loading...</p>
      )}
      {!isLoading && (
        <ul>
            {Object.keys(fridgeData).map(function(key) {
              return <li>{fridgeData[key].recipeName}</li>;
            })}
      </ul>
      )}
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