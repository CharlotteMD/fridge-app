import React, {useEffect, useState} from 'react';
import autocomplete from 'autocompleter';

import {useForm} from 'react-hook-form';

export const Recipe = (data) => {
    const [fridgeData, setFridgeData] = useState();
    const [completeIngredientsList, setCompleteIngredientsList] = useState();
    const { register, handleSubmit, watch, errors } = useForm();

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

    const onSubmit = formData => {
        console.log(formData);
    }

    // let input = document.getElementById("ingredients");
    
    // autocomplete({
    //     input: document.getElementById("ingredients"),
    //     fetch: function(text, update) {
    //         text = text.toLowerCase();
    //         const existingIngredients = completeIngredientsList.filter(n => n.label.toLowerCase().startsWith(text))
    //         update(existingIngredients);
    //     },
    //     onSelect: function(item) {
    //         document.getElementById("ingredients").value = item.label;
    //     }
    // });

    var countries = [
        { label: 'United Kingdom', value: 'UK' },
        { label: 'United States', value: 'US' }
    ];
    
    var input = document.getElementById("country");
    
    autocomplete({
        input: input,
        fetch: function(text, update) {
            text = text.toLowerCase();
            // you can also use AJAX requests instead of preloaded data
            var suggestions = countries.filter(n => n.label.toLowerCase().startsWith(text))
            update(suggestions);
        },
        onSelect: function(item) {
            input.value = item.label;
        }
    });

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

    return (
        <>
            <h2>Add a new recipe</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='recipeName'>Recipe Name:</label> 
                <input type="text" id='recipeName' name='recipeName' ref={register}/>
                <label htmlFor='ingredients'>Ingredients:</label> 
                <input type="text" id='ingredients' name='ingredients' ref={register}/>
                <button type="submit">Create</button>

                <input id='country'/>
            </form>
        </>
    )
};