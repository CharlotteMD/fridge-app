import React, {useState, useEffect} from 'react';
import {writeRecipe, recipeData} from '../App';


export const Fridge = (data) => {
    const [isLoading, setIsLoading] = useState(true);
    const [fridgeData, setFridgeData] = useState();
  
    useEffect(() => {
      if (typeof data !== "undefined") {
        setFridgeData(data.data.data)
        console.log('fridge da', fridgeData, isLoading);
      }
    }, [data])

    useEffect(() => {
        if (typeof fridgeData !== "undefined") {
            setIsLoading(false);
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