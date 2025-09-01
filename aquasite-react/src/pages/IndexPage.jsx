import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Explore o Mundo Marinho",
      subtitle: "Descubra as maravilhas dos oceanos"
    },
    {
      title: "Vida Submarina",
      subtitle: "Conheça criaturas incríveis"
    },
    {
      title: "Conservação Oceânica",
      subtitle: "Proteja nossos mares"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">{slides[currentSlide].title}</h1>
          <p className="hero-subtitle">{slides[currentSlide].subtitle}</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">Começar Jornada</Link>
            <Link to="/curiosidades" className="btn btn-secondary">Explorar Agora</Link>
          </div>
        </div>
      </div>
      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

const StatsSection = () => {
  const [stats, setStats] = useState([
    { number: 0, target: 71, label: "% da Terra é oceano" },
    { number: 0, target: 230000, label: "Espécies marinhas conhecidas" },
    { number: 0, target: 95, label: "% dos oceanos inexplorados" },
    { number: 0, target: 1000, label: "Usuários ativos" }
  ]);

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      return setInterval(() => {
        setStats(prevStats => {
          const newStats = [...prevStats];
          if (newStats[index].number < newStats[index].target) {
            const increment = Math.ceil(newStats[index].target / 100);
            newStats[index].number = Math.min(
              newStats[index].number + increment,
              newStats[index].target
            );
          }
          return newStats;
        });
      }, 50);
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, []);

  return (
    <section className="stats-section">
      <div className="container">
        <h2 className="section-title">Oceanos em Números</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number.toLocaleString('pt-BR')}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      title: "Vida Marinha",
      description: "Explore milhares de espécies marinhas com informações detalhadas e curiosidades fascinantes."
    },
    {
      title: "Ecossistemas",
      description: "Descubra diferentes ecossistemas oceânicos e sua importância para o planeta."
    },
    {
      title: "Educação",
      description: "Aprenda sobre conservação marinha e como proteger nossos oceanos."
    },
    {
      title: "Comunidade",
      description: "Conecte-se com outros entusiastas da vida marinha e compartilhe experiências."
    },
    {
      title: "Galeria",
      description: "Veja imagens incríveis do mundo submarino capturadas por mergulhadores."
    },
    {
      title: "Missões",
      description: "Participe de desafios educativos e contribua para a pesquisa marinha."
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">Recursos do AquaSite</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marina Silva",
      role: "Bióloga Marinha",
      text: "O AquaSite é uma ferramenta incrível para educação marinha. Uso com meus alunos!",
      avatar: "👩🔬"
    },
    {
      name: "João Santos",
      role: "Mergulhador",
      text: "Encontrei informações valiosas sobre espécies que encontro em meus mergulhos.",
      avatar: "🤿"
    },
    {
      name: "Ana Costa",
      role: "Estudante",
      text: "Aprendi muito sobre conservação oceânica. O conteúdo é muito bem organizado!",
      avatar: "👩🎓"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">O que dizem sobre nós</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-avatar">{testimonial.avatar}</div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HeaderMelhorado = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header-melhorado">
      <div className="header-container">
        <div className="logo-container">
          <img src="./img/logo.png" alt="AquaSite Logo" className="logo" />
          <span className="logo-text">AquaSite</span>
        </div>
        <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/">• Início</Link>
          <Link to="/sobre">• Sobre</Link>
          <Link to="/curiosidades">• Explorar</Link>
          <a href="http://wa.me/551140028922">• Contato</a>
        </nav>
        <div className="header-actions">
          <Link to="/login" className="btn-login">→ Entrar</Link>
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

const FooterMelhorado = () => {
  return (
    <footer className="footer-melhorado">
      <div className="footer-container">
        <div className="footer-section">
          <h3>AquaSite</h3>
          <p>Explorando os mistérios dos oceanos e promovendo a conservação marinha.</p>
        </div>
        <div className="footer-section">
          <h4>Links Rápidos</h4>
          <ul>
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/curiosidades">Curiosidades</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contato</h4>
          <p>contato@aquasite.com</p>
          <p>(11) 4002-8922</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 AquaSite. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

const IndexPage = () => {
  return (
    <div className="index-melhorado fade-in">
      <HeaderMelhorado />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
      </main>
      <FooterMelhorado />
    </div>
  );
};

export default IndexPage