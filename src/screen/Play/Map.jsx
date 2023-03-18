import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useRecoilState } from 'recoil';
import L from "leaflet";
import { pinPositionRecoil, goalPositionRecoil, scoreRecoil, mapDataRecoil } from '../../recoil/play';
import { Fireworks } from '@fireworks-js/react'

import './Map.css';
import { useNavigate } from 'react-router-dom';

//random float

const Mapmap = () => {
  const position = [35.3595704, 127.105399];
  const [pinPosition, setPinPosition] = useRecoilState(pinPositionRecoil);
  const [goalPosition, setGoalPosition] = useRecoilState(goalPositionRecoil);
  const [mapData, setMapData] = useRecoilState(mapDataRecoil);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setMapData([...mapData, e.latlng]);
        console.log(mapData);
        setPinPosition(e.latlng);
      },
    });

    return pinPosition === null ? null : (
      <Marker position={pinPosition}></Marker>
    );
  }

  return (
    <MapContainer 
      center={position} 
      zoom={5} 
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
      <LocationMarker />
      <Marker position={goalPosition}></Marker>
    </MapContainer>
  )
}

const distance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // 지구의 반지름 (미터)
  const φ1 = lat1 * Math.PI/180; // 위도 1
  const φ2 = lat2 * Math.PI/180; // 위도 2
  const Δφ = (lat2-lat1) * Math.PI/180; // 위도 차이
  const Δλ = (lon2-lon1) * Math.PI/180; // 경도 차이

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // 두 지점 사이의 거리 (미터)

  return d;
}

const Map = () => {
  const [pinPosition, setPinPosition] = useRecoilState(pinPositionRecoil);
  const [goalPosition, setGoalPosition] = useRecoilState(goalPositionRecoil);
  const [score, setScore] = useRecoilState(scoreRecoil);
  const navigate = useNavigate();

  const submit = () => {
    if (!pinPosition.lat || !pinPosition.lng) return;
    console.log(pinPosition, goalPosition);
    const dist = distance(pinPosition.lat, pinPosition.lng, goalPosition.lat, goalPosition.lng);
    console.log(dist);

    setScore(score ? score + Math.floor(100000000 / dist) : Math.floor(100000000 / dist));
    navigate('/score');

    return 0;
  }

  return (
    <div className='map'>
      <div className='map-div'><Mapmap /></div>
      <button 
        className={`map-submit ${pinPosition.lat && pinPosition.lng && 'map-submit-after'}`}
        onClick={submit}
      >장소 선택하기</button>
    </div>
  );
}

export default Map;