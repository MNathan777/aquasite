import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './TwitterLayout.css'

const IndexPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [clickBubbles, setClickBubbles] = useState([])
  const slides = [
    { title: "Explore o Mundo Marinho", subtitle: "Descubra as maravilhas dos oceanos" },
    { title: "Vida Submarina", subtitle: "Conheça criaturas incríveis" },
    { title: "Conservação Oceânica", subtitle: "Proteja nossos mares" }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newBubble = {
      id: Date.now(),
      x,
      y,
      size: Math.random() * 20 + 15
    }
    
    setClickBubbles(prev => [...prev, newBubble])
    
    setTimeout(() => {
      setClickBubbles(prev => prev.filter(bubble => bubble.id !== newBubble.id))
    }, 800)
  }

  return (
    <div className="twitter-layout">
      <div className="left-section" onClick={handleClick}>
        <div className="hero-content-twitter">
          <h1 className="hero-title-twitter">AquaSite</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', marginTop: '1rem' }}>
            Explore os mistérios dos oceanos
          </p>
        </div>
        {clickBubbles.map(bubble => (
          <div
            key={bubble.id}
            className="click-bubble"
            style={{
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size
            }}
          />
        ))}
      </div>

      <div className="right-section" style={{ background: 'rgba(0,0,0,0.9)' }}>
        <div className="index-content">
          <div className="slide-content">
            <h2 style={{ fontSize: '2rem', color: '#00d4ff', marginBottom: '1rem' }}>
              {slides[currentSlide].title}
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>
              {slides[currentSlide].subtitle}
            </p>
          </div>
          
          <div className="action-buttons">
            <Link to="/login" className="btn-primary-index">
              Começar Jornada
            </Link>
            <Link to="/curiosidades" className="btn-secondary-index">
              Explorar Agora
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export default IndexPage