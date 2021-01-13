import React from 'react';
import firebase from 'firebase/app';

// function writeUserData(userId, ...recipe ) {
//     firebase.database().ref('users/' + userId).set({
//       recipeName: recipe.name,
//       ingredients: recipe.ingredients,
//     });
//     console.log('done');
//   }


export const ReadAndWrite = () => {
    const recipe = {
        name: "Spaghetti Bolognaise",
        ingredients: "tomatoes"
    };

    // const userId = firebase.auth().currentUser.uid;
    // console.log(userId);

    return (
        <>
            {/* <button onSubmit={writeUserData(userId, recipe)}>Read</button> */}
        </>
    )
}