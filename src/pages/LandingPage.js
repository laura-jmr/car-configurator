import React, { useState, useEffect } from 'react';
import "./LandingPage.css";
import Title from '../components/Title';
import Dropdown from '../components/Dropdown';
import CarRender from '../components/CarRender';
import QRCode from 'qrcode.react';

export default function Landing( {preselectedColor, preselectedPS} ) {
    console.log("preselected params; color: " + preselectedColor + ", ps: " + preselectedPS)
    const [selectedColor, setSelectedColor] = useState('Blau');
    const [selectedPS, setSelectedPS] = useState('280PS');
    const [qrSize, setQrSize] = useState(128);

    console.log("selected params; color: " + selectedColor + ", ps: " + selectedPS)

    useEffect(() => {
        if (preselectedColor) {
            setSelectedColor(preselectedColor);
        }
        if (preselectedPS) {
            setSelectedPS(preselectedPS)
        }
    }, [preselectedColor, preselectedPS]);

    useEffect(() => {
        const updateQrSize = () => {
            if (window.matchMedia("(min-width: 1200px)").matches) {
                setQrSize(128); // Extra large devices
            } else if (window.matchMedia("(min-width: 992px)").matches) {
                setQrSize(128); // Large devices
            } else if (window.matchMedia("(min-width: 768px)").matches) {
                setQrSize(128); // Medium devices
            } else {
                setQrSize(64); // Small devices
            }
        };

        updateQrSize();

        window.addEventListener("resize", updateQrSize);

        return () => {
            window.removeEventListener("resize", updateQrSize);
        };
    }, []);

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
        console.log("calcing new price")

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
            case '280PS':
                psPrice = 0;
                break;
            case '350PS':
                psPrice = 3000;
                break;
            default:
                psPrice = 0;
        }

        let totalPrice = basePrice + colorPrice + psPrice;
        return totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    };

    const generateCustomLink = () => {
        return `http://laurajmr.com/car-configurator/?color=${selectedColor}&ps=${selectedPS}`;
    };

    console.log("selected color value: " + selectedColor);
    return (
        <div id='landing-page-container'>
            <nav id="landing-page-nav">
                <img src='mazda-logo.png' alt='mazda logo' onClick={handleClick} />
            </nav>
            <div id='landing-page-main'>
                <h1 id='title'>{"Mazda RX-7 Individual"}</h1>
                <div id="configuration-container">
                    <Dropdown title="Lackierung" options={["Blau", "Gelb", "Weiss"]} onSelect={handleColorChange} defaultOption={selectedColor}/>
                    <Dropdown title="Motorleistung" options={["280PS", "350PS"]} onSelect={handlePSChange} defaultOption={selectedPS}/>
                </div>
                <div id="total-price">
                    <p>Gesamtpreis:</p>
                    <p>{calculatePrice()}</p>
                </div>
                <div id="qr">
                    <h3>Teile jetzt!</h3>
                    <QRCode value={generateCustomLink()} size={qrSize}/>
                </div>
            </div>
            <CarRender scale={8} position={[0, -3, 0]} color={selectedColor} ps={selectedPS} />
        </div >
    )
}