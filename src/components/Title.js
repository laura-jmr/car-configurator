import React from 'react';
import "./Title.css";

export default function Title( {title} ) {
    return (
        <div id='title-container'>
            <h1>{title}</h1>
        </div >
    )
}