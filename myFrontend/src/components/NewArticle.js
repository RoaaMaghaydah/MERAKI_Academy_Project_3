import React, { useState } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';
import axios from 'axios';


export default function NewArticle(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [statas, setStatas] = useState(false);
    const [statas1, setStatas1] = useState(false);
    const newArticles = () => {
        const newArt = { title, description };
        axios.post(`http://localhost:5000/articles`, newArt)
            .then((response) => {
                if (response.data._id) {
                    console.log()
                    setStatas(true)
                    setStatas1(false)
                }
                else {
                    setStatas1(true)
                    setStatas(false)
                }


            })
            .catch((err) => {
                console.log("error")
            })

    }

    return (
        <>
            <div className="Deshboard">
                <h4 style={{ margin: "10px" }}>  Add New Article </h4>
                <input className="newArticleInput" type="text" placeholder="Title here" onChange={(e) => {
                    setTitle(e.target.value);
                }} />
                <input className="newArticleInput_1" type="text" placeholder="description" onChange={(e) => {
                    setDescription(e.target.value);
                }} />
                <button className="newArticleButton" onClick={newArticles}>Create New Artical</button>

                {statas ? <div class="trueRegiste">The article has been created successfully</div> : ""}
                {statas1 ? <div class="falseRegiste">Error happened while creating a new article, please try again</div> : ""}

            </div>
        </>
    )
}