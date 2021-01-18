import React, {useState, useEffect} from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

import {firebaseConfig} from './config';

import {FridgeRoutes} from './screens/FridgeRoutes';


firebase.initializeApp(firebaseConfig)

const ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      return true;
    },
    uiShown: function() {
      document.getElementById('loader').style.display = 'none';
    }
  },
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '<your-tos-url>',
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);


const database = firebase.database();
// const userId = firebase.auth().currentUser.uid;

const retrieveRecipes = firebase.database().ref('recipes/');

let recipeDataObj = {};

// const recipes = async function getTheData() {
//   const data = await retrieveRecipes.once('value', (snapshot) => {
//     const recipeData = snapshot.val();
//     let recipeDataObj = recipeData;
//     console.log(recipeDataObj);
//   });
// }

// recipes();

export const writeRecipe = (recipeName, ingredients) => {
  firebase.database().ref('recipes/' + recipeName).set({
    recipeName: recipeName,
    ingredients: ingredients,
  });
}

writeRecipe('Risotto', 'risotto rice')
writeRecipe('Tuna Pasta', ['tuna', 'pasta', 'tomatoes'])
writeRecipe('Spaghetti Bolognaise', ['mince', 'tomatoes', 'onions', 'pasta'])
writeRecipe('Fish Pie', 'fish')

const App = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function getTheData() {
    try {
      await retrieveRecipes.once('value', (snapshot) => {
        setIsLoading(true);
        const recipeData = snapshot.val();
        setData(recipeData);
        setIsLoading(false);
      });
    } catch (e) {
      console.log('error', e);
    } 
  }

  useEffect(() => {
    if (data === undefined) {
      getTheData()
    }
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])


  return (
    <div className="App">
      <h1>Welcome to My Awesome App</h1>
      { isLoading && (
        <p>Loading...</p>
      )}
      {!isLoading && (
        <ul>
            {Object.keys(data).map(function(key) {
              return <li>{data[key].recipeName}</li>;
            })}
      </ul>
      )}

      <FridgeRoutes data={data}/>
    </div>
  );
}

export default App;
