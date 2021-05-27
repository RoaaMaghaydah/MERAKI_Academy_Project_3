import React, { useState } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';
import axios from 'axios';

export default function Deshboard(props) {

    return (
        <>
            <div>
                <div className="Navigation" style={{ display: 'flex', gap: '16px' }}>
                    <Link to="/deshboard">Dashboard</Link>
                    <Link to="/register">Register</Link>
                </div>
                <div className="Deshboard">
                    <h4 style={{ margin:"10px" }}>Deshboard</h4>
                    <button className="DeshboardButton">Get All Articals</button>
                </div>
            </div>
        </>
    );
};
