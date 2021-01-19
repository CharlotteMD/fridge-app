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

  async function getTheData() {
    try {
      await retrieveRecipes.once('value', (snapshot) => {
        const recipeData = snapshot.val();
        setData(recipeData);
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

  return (
    <div className="App">
      <h1>Welcome to My Awesome App</h1>
      <FridgeRoutes data={data}/>
    </div>
  );
}

export default App;
