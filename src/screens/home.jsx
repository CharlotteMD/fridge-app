import React from 'react';

import {ReadAndWrite} from './readAndWrite';

export const Home = () => {
    return (
        <>
            <h2>
                <a href='/login'>Login</a>
            </h2>
            <ReadAndWrite/>
        </>
    )
}
