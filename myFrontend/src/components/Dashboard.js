import React, { useState } from 'react';
import { useHistory, Redirect,Link } from 'react-router-dom';
import axios from 'axios';

export default function Deshboard(props) {

    return (
        <>
        <div>
        <div className="Navigation" style={{ display: 'flex', gap: '16px' }}>
        <Link to="/deshboard">Dashboard</Link>
        <Link to="/register">Register</Link>
         </div>
        </div>
            <div className="Deshboard">

            </div>
        </>
    );
};
