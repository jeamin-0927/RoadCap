import React, { useEffect } from 'react';

import './index.css';

import Infomation from './Infomation';
import Timer from './Timer';
import Roadview from './Roadview';
import Map from './Map';

import { useRecoilState } from 'recoil';
import { goalPositionRecoil, nowTimerRecoil } from '../../recoil/play';

import { initGame } from '../../utils/game';

const Play = () => {
  const [goalPosition, setGoalPosition] = useRecoilState(goalPositionRecoil);
  initGame();

  return (
    <div>
      <Roadview goalPosition={goalPosition} />
      <Infomation time="01:00" round="3" score="1802" />
      <Timer />
      <Map />
    </div>
  );
}

export default Play;