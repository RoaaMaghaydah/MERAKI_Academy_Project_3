import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


export default function Login(props) {

    return (
        <>
            <div className="Login">
                <input className="LoginInput" type="text" placeholder="Enter the email" />
                <input className="LoginInput" type="password" placeholder="Enter the password" />

                <button className="LoginButton">Login</button>
            </div>
        </>
    );
}
