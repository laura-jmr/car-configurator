import React from 'react';
import "./Dropdown.css";

export default function Dropdown( { title, options, onSelect, defaultOption } ) {
    const handleSelection = (event) => {
        const selectedOption = event.target.value;
        onSelect(selectedOption);
    };

    console.log("Dropdown: " + defaultOption)
    return (
        <div className="dropdown-menu">
            <label>{title}</label>
            <select onChange={handleSelection} value={defaultOption}>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}