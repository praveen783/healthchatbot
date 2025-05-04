import './App.css';
import Homepage from './homepage';
import Avatarpage from './avatarpage';
import Chatpage from './chatpage';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/avatar" element={<Avatarpage />} />
          <Route path="/chat" element={<Chatpage/>} />
        </Routes>
      </Router>
    </>
  );
}

