import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DressagePage from './pages/DressagePage'
import ShowJumpingPage from './pages/ShowJumpingPage'
import EventingPage from './pages/EventingPage'
import TentPeggingPage from './pages/TentPeggingPage'
import EndurancePage from './pages/EndurancePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dressage" element={<DressagePage />} />
        <Route path="/show-jumping" element={<ShowJumpingPage />} />
        <Route path="/eventing" element={<EventingPage />} />
        <Route path="/tent-pegging" element={<TentPeggingPage />} />
        <Route path="/endurance" element={<EndurancePage />} />
      </Routes>
    </Router>
  )
}

export default App
