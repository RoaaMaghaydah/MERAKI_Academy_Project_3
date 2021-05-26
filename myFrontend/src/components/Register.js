import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Register(props) {
    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [statas, setStatas] = useState(); 
    
    const cheakRegiste = () => {
        
        const newUser={ firstName:firstName, lastName:lastName, age:age, country:country, email:email, password:password};
        axios.post(`http://localhost:5000/users`,newUser)
            .then((response) => {
                //setStatas(true)
                if(response.firstName!==""){
                    setStatas(true)
                }
            })
            .catch((err)=>{
               console.log("error")
           })
        }
    

    return (
        <div className="Register">
            <input className="RegisterInput" type="text" placeholder="firstName" onChange={(e) => {
                setFirstName(e.target.value);
            }} />
            <input className="RegisterInput" type="text" placeholder="lastName" onChange={(e) => {
                setLastName(e.target.value);
            }} />
            <input className="RegisterInput" type="number" placeholder="age" onChange={(e) => {
                setAge(e.target.value);
            }} />
            <input className="RegisterInput" type="text" placeholder="country" onChange={(e) => {
                setCountry(e.target.value);
            }} />
            <input className="RegisterInput" type="text" placeholder="email" onChange={(e) => {
                setEmail(e.target.value);
            }} />
            <input className="RegisterInput" type="password" placeholder="password" onChange={(e) => {
                setPassword(e.target.value);
            }} />

            <button className="RegisterButton" onClick={cheakRegiste}>Register</button>
            {statas?<div class="trueRegiste">The user has been created successfully</div> :<div class="falseRegiste">Error happened while register, please try again</div>}
                
            <p style={{ cursor: 'pointer' }} onClick={() => { history.push('/'); }}> Home </p>
        </div>
    );
}
