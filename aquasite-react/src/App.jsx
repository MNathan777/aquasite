import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import CuriosidadesPage from './pages/CuriosidadesPage'
import SobrePage from './pages/SobrePage'
import Bubbles from './components/Bubbles'
import './App.css'

function App() {
  return (
    <Router>
      <Bubbles />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/curiosidades" element={<CuriosidadesPage />} />
        <Route path="/sobre" element={<SobrePage />} />
      </Routes>
    </Router>
  )
}

export default App
