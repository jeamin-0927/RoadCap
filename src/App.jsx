import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import './App.css'

import Main from './screen/Main';
import Play from './screen/Play';
import Score from './screen/Score';

const Errors = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/');
  }, []);
  return <></>;
}

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/play" element={<Play />} />
          <Route path="/score" element={<Score />} />
          <Route path="*" element={<Errors />} />
      </Routes>
    </Router>
  )
}

export default App
