import React, { useState } from 'react';
import "./LandingPage.css";
import Title from '../components/Title';
import Dropdown from '../components/Dropdown';
import CarRender from '../components/CarRender';

export default function Landing() {
    const [selectedColor, setSelectedColor] = useState('Blau');
    const [selectedPS, setSelectedPS] = useState('280 PS');

    const handleCanvasCreated = (canvas) => {
        console.log(canvas.offsetWidth, canvas.offsetHeight);
      };

    const handleClick = () => {
        window.location.reload();
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handlePSChange = (ps) => {
        setSelectedPS(ps);
    };

    console.log("selected color value: " + selectedColor);
    return (
        <div id='landing-page-container'>
            <nav id="landing-page-nav">
                <img src='mazda-logo.png' alt='mazda logo' onClick={handleClick} />
            </nav>
            <div id='landing-page-main'>
                <Title title={"KFZ-Konfigurator"} />
                <div>
                    <Dropdown title="Lackierung" options={["Blau", "Gelb", "Weiss"]} onSelect={handleColorChange} />
                    <Dropdown title="Motorleistung" options={["280 PS", "350 PS"]} onSelect={handlePSChange} />
                </div>
            </div>
            <CarRender scale={8} position={[0, -3, 0]} color={selectedColor} ps={selectedPS}/>
        </div >
    )
}