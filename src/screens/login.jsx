import React from 'react';

export const Login = () => {
    return (
        <>
        <div id="firebaseui-auth-container"></div>
        <p id='loader'>Loading...</p>
        <div id="sign-in-status"></div>
        <div id="sign-in"></div>
        <pre id="account-details"></pre>
        </>
    )
}