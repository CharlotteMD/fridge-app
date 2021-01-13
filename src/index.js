/*global firebaseui*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

import {firebaseConfig} from './config';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

firebase.initializeApp(firebaseConfig)

// Auth

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '<your-tos-url>',
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

// API
const database = firebase.database();

const recipeName = "Spaghetti Bolognaise";
const ingredients = ["tomatoes", "onions", "pasta", "mince"];


// const userId = firebase.auth().currentUser.uid;

const writeRecipe = (recipeName, ingredients) => {
  firebase.database().ref('recipes/' + recipeName).set({
    ingredients: ingredients,
  });
}

writeRecipe(recipeName, ingredients);
writeRecipe('Fish Pie', ['fish', 'potatoes', 'milk', 'flour']);
writeRecipe('Halloumi Curry', ['halloumi', 'sweet potato', 'coconut milk', 'tomatoes']);


const retrieveRecipes = firebase.database().ref('recipes/');
retrieveRecipes.on('value', (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});