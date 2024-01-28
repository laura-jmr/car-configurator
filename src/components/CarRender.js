import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./CarRender.css";
import rx7Blue from './mazda-rx7-blue.glb';
import rx7Yellow from './mazda-rx7-yellow.glb';
import rx7White from './mazda-rx7-white.glb';

function CarModel({ scale, position, color }) {
    const ref = useRef();

    const gltf = useLoader(GLTFLoader, color);

    useFrame((state, delta) => (ref.current.rotation.y += 0.006));

    return (
        <Suspense fallback={null}>
            <primitive
                ref={ref}
                object={gltf.scene}
                position={position}
                scale={scale}
            />
        </Suspense>
    );
}

export default function CarRender({ scale = 100, position = [0, 10, 0], color, ps }) {
    const [modelPath, setModelPath] = useState(rx7Blue);

    useEffect(() => {
        let path;
        switch (color) {
            case 'Blau':
                path = rx7Blue;
                break;
            case 'Gelb':
                path = rx7Yellow;
                break;
            case 'Weiss':
                path = rx7White;
                break;
            default:
                path = rx7Blue;
        }
        console.log("CarModel: Set Model Path to " + path)
        setModelPath(path);
    }, [color]);

    return (
        <div className="canvas-container">
            <div className="canvas-inner-container">
                <div id="canvas-stats">
                    <h3>Mazda RX-7</h3>
                    <ul id="canvas-stats-list">
                        <li>{ps}</li>
                        <li>Drehmoment: 220 Nm</li>
                        <li>Kraftstoffeffizienz: 8 L/100 km</li>
                        <li>Höchstgeschwindigkeit: 240 km/h</li>
                    </ul>
                </div>
                <Canvas
                    style={{ width: '100%', height: '100%' }}
                    camera={{ fov: 30, position: [0, 0, -60] }}
                >
                    <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
                    <directionalLight position={[-10, -10, -10]} intensity={1.5} color="#ffffff" />
                    <ambientLight intensity={0.4} color="#ffffff" />
                    <CarModel scale={scale} position={position} color={modelPath} />
                </Canvas>
            </div>
        </div>
    );
}
