import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import './App.css'

import Main from './screen/Main';
import Play from './screen/Play';

const Errors = () => {
  const navigate = useNavigate();
  return (
    <div className="error">
      <h1>404</h1>
      <p>Page not found</p>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  )
}


const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/play" element={<Play />} />
          <Route path="*" element={<Errors />} />
      </Routes>
    </Router>
  )
}

export default App
