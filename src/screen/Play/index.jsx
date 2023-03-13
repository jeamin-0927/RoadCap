import React, { useState, useEffect } from 'react';

import './index.css';

import Infomation from './Infomation';
import Timer from './Timer';
import Roadview from './Roadview';
import Map from './Map';

import { useRecoilState } from 'recoil';
import { goalPositionRecoil, nowTimerRecoil } from './recoilStates';

const Play = () => {
  const [nowTimer, setNowTimer] = useRecoilState(nowTimerRecoil);
  let endTime = null;

  useEffect(() => {
    endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + 2);

    const timer = setInterval(() => {
      const nowTime = new Date();
      const diffTime = endTime - nowTime;
      const diffTimeSec = Math.floor(diffTime / 1000);

      const isTimeOver = diffTimeSec < 0;
      const dfSec = String(diffTimeSec % 60).padStart(2, '0');
      const dfMin = String(Math.floor(diffTimeSec / 60)).padStart(2, '0');

      setNowTimer(isTimeOver ? '00:00' : `${dfMin}:${dfSec}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [goalPosition, setGoalPosition] = useRecoilState(goalPositionRecoil);
  useEffect(() => {
    const getRandomFloat = (min, max) => {
      return Math.random() * (max - min) + min;
    }
    setGoalPosition({
      lat: getRandomFloat(33.0649, 38.6132),
      lng: getRandomFloat(124.5841, 131.6349)
    })
  }, []);


  return (
    <div>
      <Roadview />
      <Infomation time="01:00" round="3" score="1802" />
      <Timer time={nowTimer}/>
      <Map />
    </div>
  );
}

export default Play;