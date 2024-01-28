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

    const calculatePrice = () => {
        let basePrice = 30000;
        let colorPrice = 0;
        let psPrice = 0;

        switch (selectedColor) {
            case 'Blau':
                colorPrice = 0;
                break;
            case 'Gelb':
                colorPrice = 500;
                break;
            case 'Weiß':
                colorPrice = 200;
                break;
            default:
                colorPrice = 0;
        }

        switch (selectedPS) {
            case '280 PS':
                psPrice = 0;
                break;
            case '350 PS':
                psPrice = 3000;
                break;
            default:
                psPrice = 0;
        }

        let totalPrice = basePrice + colorPrice + psPrice;
        return totalPrice;
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
                <div id="total-price">
                    <p>Gesamtpreis: {calculatePrice()} €</p>
                </div>
            </div>
            <CarRender scale={8} position={[0, -3, 0]} color={selectedColor} ps={selectedPS}/>
        </div >
    )
}