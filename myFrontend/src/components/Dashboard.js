import React, { useState, useEffect } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';
import axios from 'axios';

export default function Deshboard(props) {
    const [art, setArt] = useState();

    const getData = () => {
        axios.get(`http://localhost:5000/articles`)
            .then((response) => {
                console.log(response.data);
                setArt(response.data);
            })
            .catch((err) => {
                console.log('ERR: ', err);
            });
    };

    useEffect(() => {

        getData();
    }, []);
    return (
        <>
            <div className="Deshboard">
                <h4 style={{ margin: "10px" }}>Deshboard</h4>
                <button className="DeshboardButton" onClick={getData}>Get All Articals</button>
                {art && art.map((article, i) => <><div className="addArt" key={i}>
                    <div>
                        <p className="addArt1"> {article.title}</p>
                        <p className="addArt2">{article.description}</p>
                    </div>
                    <div>
                        <button className="addArtButton"> More Details</button>
                    </div>
                </div>
                </>)}
            </div>
        </>
    );
};
