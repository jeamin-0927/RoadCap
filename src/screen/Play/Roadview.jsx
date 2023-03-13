import './Roadview.css';
import { Roadview } from 'react-kakao-maps-sdk';
import { goalPositionRecoil } from '../../recoil/play';
import { useRecoilState } from 'recoil';
import { useEffect, useRef } from 'react';

const Rdv = () => {
  const [goalPosition, setGoalPosition] = useRecoilState(goalPositionRecoil);
  return (
    <div className='roadview'>
      <Roadview
        position={{
          ...goalPosition,
          radius: 50000
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default Rdv;