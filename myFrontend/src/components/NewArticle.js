import React, { useState } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';
import axios from 'axios';


export default function NewArticle(props) {
    const [title, setTitle] = useState("");
    const [description,  setDescription] = useState("");


    return (
        <>
            <div className="Navigation" style={{ display: 'flex', gap: '16px' }}>
                <Link to="/deshboard">Dashboard</Link>
                <Link to="/newArticle">New Article</Link>
            </div>

            <div className="Deshboard">
                <h4 style={{ margin: "10px" }}>  Add New Article </h4>
                <input className="newArticleInput" type="text" placeholder="Title here" onChange={(e) => {
                    setTitle(e.target.value);
                }} />
                <input className="newArticleInput_1" type="password" placeholder="description" onChange={(e) => {
                    setDescription(e.target.value);
                }} />
                 <button className="newArticleButton" >Create New Artical</button>
            </div>
        </>
    )
}