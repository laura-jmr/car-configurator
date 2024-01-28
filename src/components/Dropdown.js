import React from 'react';
import "./Dropdown.css";

export default function Dropdown( { title, options, onSelect } ) {
    const handleSelection = (event) => {
        const selectedOption = event.target.value;
        onSelect(selectedOption);
    };

    return (
        <div className="dropdown-menu">
            <label>{title}</label>
            <select onChange={handleSelection}>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}