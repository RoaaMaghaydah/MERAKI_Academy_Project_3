import React, { useState } from 'react';

export default function Register(props) {
    
    return (
        <div className="Register">
            <input className="RegisterInput" type="text" placeholder="firstName" />
            <input className="RegisterInput" type="text" placeholder="lastName" />
            <input className="RegisterInput" type="number" placeholder="age" />
            <input className="RegisterInput" type="text" placeholder="country" />
            <input className="RegisterInput" type="text" placeholder="email" />
            <input className="RegisterInput" type="password" placeholder="password" />
            <button className="RegisterButton">Register</button>
        </div>
    );
}
