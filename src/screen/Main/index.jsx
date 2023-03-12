import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import './style.css'


const Main = () => {
  const navigate = useNavigate();
  return (
    <div className='background'>
      <div className='title'>RoadCap</div>
      <button className='start' onClick={() => {
        navigate('/play');
      }}>빠른 시작</button>
    </div>
  );
}

export default Main;