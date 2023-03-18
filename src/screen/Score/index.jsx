import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { scoreRecoil } from '../../recoil/play';
import { Fireworks } from '@fireworks-js/react'


const Firework = (props) => {
  const { score } = props;
  const [showFirework, setShowFirework] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowFirework(false);
    }, 3000);
  }, []);

  return (
    score > 1000 && <Fireworks
      options={{
        rocketsPoint: {
          min: 0,
          max: 100
        }
      }}
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'fixed',
        background: 'rgba(0, 0, 0, 0)',
        opacity: showFirework ? 1 : 0,
        transition: 'opacity 1s ease-in-out'
      }}
    />
  )
}


const Score = () => {
  const [score, setScore] = useRecoilState(scoreRecoil);
  const scoreStr = score && score.toLocaleString();
  const navigate = useNavigate();

  useEffect(() => {
    if (score === null) {
      navigate('/');
    }
  }, [score]);

  return (
    <div>
      <Firework score={score} />
      <h1>Score</h1>
      <p>{scoreStr}</p>
    </div>
  )
}

export default Score;