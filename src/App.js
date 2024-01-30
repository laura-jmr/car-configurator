import './App.css';
import Landing from './pages/LandingPage';
import { useLocation } from 'react-router-dom';
import React, { Suspense, useState, useEffect } from "react";


function App() {
  const location = useLocation();
  const [preselectedColor, setPreselectedColor] = useState(null);
  const [preselectedPS, setPreselectedPS] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const colorParam = searchParams.get('color');
    const psParam = searchParams.get('ps');

    console.log("Searching for presaves; color: " + colorParam + ", ps: " + psParam)

    if (colorParam) {
      setPreselectedColor(colorParam);
    }
    if (psParam) {
      setPreselectedPS(psParam);
    }
  }, [location.search]);

  return (
    <div className="App">
      <Landing preselectedColor={preselectedColor} preselectedPS={preselectedPS}/>
    </div>
  );
}

export default App;
