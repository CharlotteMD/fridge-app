import React, {useState, useEffect} from 'react';
import {writeRecipe} from '../App';
import {useForm} from 'react-hook-form';


export const Fridge = (data) => {
    const [isLoading, setIsLoading] = useState(true);
    const [fridgeData, setFridgeData] = useState();
    const [completeIngredientsList, setCompleteIngredientsList] = useState();
    const [availableIngredients, setAvailableIngredients] = useState();
    const [recipeSuggestions, setRecipeSuggestions] = useState();

    const { register, handleSubmit, watch, errors } = useForm();

    const myRecipeArray = [];

    function getRecipes(searchValue) {
        console.log(fridgeData)
        Object.keys(fridgeData).map(function(key) {
            const recipeIngredients = fridgeData[key].ingredients;
            
            let howMany = Array.isArray(recipeIngredients);
            if (howMany) {
                fridgeData[key].ingredients.map(ingredients => {
                    if (ingredients === searchValue) {
                        myRecipeArray.push(fridgeData[key])
                    }
                })
            } else {
                const filteredRecipes = Object.keys(fridgeData).filter(e => fridgeData[e].ingredients === searchValue)
                if (filteredRecipes.length > 0) {
                    myRecipeArray.push(filteredRecipes)
                }
            }

          })
    }


    const onSubmit = data => {
        const checkedIngredients = Object.keys(data).filter(e => data[e] === true);
        setAvailableIngredients(checkedIngredients);

        checkedIngredients.map(ingredient => (getRecipes(ingredient)))

        setRecipeSuggestions(myRecipeArray);
    }

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
            setCompleteIngredientsList(noDuplicates);
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
        if (completeIngredientsList) {
            setIsLoading(false);
        }
    }, [completeIngredientsList])

    // useEffect(() => {
    //     if (availableIngredients) {
    //         console.log(availableIngredients);
    //     }
    // }, [availableIngredients])

    useEffect(() => {
        if (recipeSuggestions) {
            console.log(recipeSuggestions);
        }
    }, [recipeSuggestions])

    function submitRecipe() {
        writeRecipe('Risotto', 'risotto rice')
        writeRecipe('Tuna Pasta', ['tuna', 'pasta', 'tomatoes'])
        writeRecipe('Spaghetti Bolognaise', ['mince', 'tomatoes', 'onions', 'pasta'])
        writeRecipe('Risotto', 'risotto rice')
        writeRecipe('Halloumi Curry', ['halloumi', 'coconut milk', 'tomatoes', 'peppers', 'onions'])
    }

    return (
        <>
            <h2>What's in the fridge?</h2>
            { isLoading && (
                <p>Loading...</p>
            )}
            {!isLoading && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    {completeIngredientsList.map(ingredients => (
                        <div>
                            <input type="checkbox" id={ingredients} name={ingredients} ref={register}/>
                            <label htmlFor={ingredients}>{ingredients}</label>
                        </div>
                    ))}
                <button type="submit" onSubmit={submitRecipe()}>Feed Me</button>
                </form>
            )}
        </>
    )
};