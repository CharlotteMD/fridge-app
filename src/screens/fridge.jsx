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
            getIngredients()
        }
    }, [fridgeData])

    useEffect(() => {
        if (ingredientsList) {
            setIsLoading(false);
            console.log(ingredientsList);
        }
    }, [ingredientsList])

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
            {/* {!isLoading && (
                <ul>
                    {Object.keys(fridgeData).map(function(key) {
                    return <li>{fridgeData[key].recipeName}</li>;
                    })}
                </ul>
            )} */}
            {!isLoading && (
                <form>
                    {ingredientsList.map(ingredients => (
                        <div>
                            <input type="checkbox" id={ingredients} name={ingredients} value={ingredients}/>
                            <label htmlFor={ingredients}>{ingredients}</label>
                        </div>
                    ))}
                                
                <div>
                    <button type="submit" onSubmit={submitRecipe()}>Feed Me</button>
                </div>
                </form>
            )}
        </>
    )
};