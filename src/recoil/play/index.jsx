import { atom } from 'recoil';


export const pinPositionRecoil = atom({
  key: 'pinPositionRecoil',
  default: {
    lat: null,
    lng: null
  }
});

export const goalPositionRecoil = atom({
  key: 'goalPositionRecoil',
  default: {
    lat: 0,
    lng: 0
  }
});

export const nowTimerRecoil = atom({
  key: 'nowTimerRecoil',
  default: '01:59'
});

export const roundRecoil = atom({
  key: 'roundRecoil',
  default: 1
});

export const scoreRecoil = atom({
  key: 'scoreRecoil',
  default: null
});

export const mapDataRecoil = atom({
  key: 'mapDataRecoil',
  default: []
});