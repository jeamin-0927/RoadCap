import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { pinPositionRecoil, goalPositionRecoil, nowTimerRecoil, roundRecoil, scoreRecoil } from '../../recoil/play';

import korea from '../../utils/game/korea.json';

const isPointInPolyons = (point, polygons) => {
  const isPointInPolygon = (point, polygon) => {
    // 다각형 내부에 있는 점인지 여부를 판단하기 위해 교차하는 선의 수를 저장할 변수
    let intersectCount = 0;
  
    // 다각형의 각 꼭짓점을 이어주는 선분을 하나씩 검사
    for (let i = 0; i < polygon.length; i++) {
      // 현재 꼭짓점과 다음 꼭짓점을 연결하는 선분의 끝점 좌표
      const vertex1 = polygon[i];
      const vertex2 = polygon[(i + 1) % polygon.length];
  
      // 수직선과 현재 선분이 교차하는지 검사
      if (
        (vertex1[1] > point[1] && vertex2[1] <= point[1]) ||
        (vertex2[1] > point[1] && vertex1[1] <= point[1])
      ) {
        // 현재 선분과 수직선이 교차하는 x좌표를 계산
        const intersectX =
          ((point[1] - vertex1[1]) *
            (vertex2[0] - vertex1[0]) /
            (vertex2[1] - vertex1[1])) +
          vertex1[0];
  
        // 현재 점이 선분의 오른쪽에 있으면 교차하지 않은 것으로 간주
        if (intersectX > point[0]) {
          intersectCount++;
        }
      }
    }
  
    // 교차하는 선분의 수가 홀수면 다각형 내부에 위치한 것으로 간주
    return intersectCount % 2 !== 0;
  }
  for(let polygon of polygons) {
    if(isPointInPolygon(point, polygon)) {
      return true;
    }
  }
  return false;
}

export const initGame = () => {
  const [pinPosition, setPinPosition] = useRecoilState(pinPositionRecoil);
  const [goalPosition, setGoalPosition] = useRecoilState(goalPositionRecoil);
  const [nowTimer, setNowTimer] = useRecoilState(nowTimerRecoil);
  
  useEffect(() => {
    setPinPosition({
      lat: null,
      lng: null
    });  
  }, []);
  //console.log("initGame", goalPosition);

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

  useEffect(() => {
    const getRandomPosition = () => {
      const getRandomFloat = (min, max) => Math.random() * (max - min) + min;
      const randomPosition = [getRandomFloat(33.0649, 38.6132), getRandomFloat(124.5841, 131.6349)];
      if(isPointInPolyons(randomPosition, korea)) {
        return randomPosition;
      }
      return getRandomPosition();
    }

    const position = getRandomPosition();

    setGoalPosition({
      lat: position[0],
      lng: position[1]
    })
  }, []);
}