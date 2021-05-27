import React, { useState } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login(props) {
    console.log("settoken",props.func)
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const cheakLogin = () => {
        const login = { email, password };
        console.log(login);
        axios.post(`http://localhost:5000/login`, login)
            .then((response) => {
               //setToken(response.data.token);
               props.func(response.data.token)
                history.push("/deshboard")
            })
            .catch((err) => {
                console.log(err)
                console.log("error")
            })
    }
    return (

        <>
            <div className="Login">
                <input className="LoginInput" type="text" placeholder="Enter the email" onChange={(e) => {
                    setEmail(e.target.value);
                }} />
                <input className="LoginInput" type="password" placeholder="Enter the password" onChange={(e) => {
                    setPassword(e.target.value);
                }} />

                <button className="LoginButton" onClick={cheakLogin}>Login</button>
            </div>
        </>
    );
}

