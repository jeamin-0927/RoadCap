import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Fireworks } from '@fireworks-js/react';

import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet'
import { pinPositionRecoil, goalPositionRecoil, scoreRecoil } from '../../recoil/play';

import './index.css';

const ScoreMap = () => {
  const position = [ 35.8595704, 127.105399 ];
  const [ pinPosition, setPinPosition ] = useRecoilState(pinPositionRecoil);
  const [ goalPosition, setGoalPosition ] = useRecoilState(goalPositionRecoil);

  const mapRef = useRef(null);


  return (
    <MapContainer 
      center={position} 
      zoom={7} 
      scrollWheelZoom={true}
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={pinPosition}></Marker>
      <Marker position={goalPosition}></Marker>
    </MapContainer>
  )
}


const Firework = (props) => {
  const [ score, setScore ] = useRecoilState(scoreRecoil);
  const [ showFirework, setShowFirework ] = useState(true);
  const [ fadeFirework, setFadeFirework ] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowFirework(false);
      setTimeout(() => {
        setFadeFirework(false);
      }, 1000);
    }, 3000);
  }, []);

  return (
    score > 0 && fadeFirework && <Fireworks
      options={{
        rocketsPoint: {
          min: 0,
          max: 100
        }
      }}
      className="firework"
      style={{
        opacity: showFirework ? 1 : 0,
      }}
    />
  )
}


const Score = () => {
  const [ score, setScore ] = useRecoilState(scoreRecoil);
  const scoreStr = score && score.toLocaleString();
  const navigate = useNavigate();

  useEffect(() => {
    if (score === null) {
      navigate('/');
    }
  }, [score]);

  return (
    <div>
      <Firework />
      <div className='scoremap'><ScoreMap /></div>
      <h1>Score</h1>
      <p>{scoreStr}</p>
    </div>
  )
}

export default Score;