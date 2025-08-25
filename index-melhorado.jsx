// Componente Hero melhorado
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
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

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return React.createElement('section', { className: 'hero-section' },
    React.createElement('div', { className: 'hero-content' },
      React.createElement('div', { className: 'hero-text' },
        React.createElement('h1', { className: 'hero-title' }, slides[currentSlide].title),
        React.createElement('p', { className: 'hero-subtitle' }, slides[currentSlide].subtitle),
        React.createElement('div', { className: 'hero-buttons' },
          React.createElement('a', { href: 'login-react.html', className: 'btn btn-primary' }, 'Começar Jornada'),
          React.createElement('a', { href: 'curiosidades-melhorado.html', className: 'btn btn-secondary' }, 'Explorar Agora')
        )
      )
    ),
    React.createElement('div', { className: 'hero-indicators' },
      slides.map((_, index) =>
        React.createElement('button', {
          key: index,
          className: `indicator ${index === currentSlide ? 'active' : ''}`,
          onClick: () => setCurrentSlide(index)
        })
      )
    )
  );
};

// Componente de estatísticas
const StatsSection = () => {
  const [stats, setStats] = React.useState([
    { number: 0, target: 71, label: "% da Terra é oceano" },
    { number: 0, target: 230000, label: "Espécies marinhas conhecidas" },
    { number: 0, target: 95, label: "% dos oceanos inexplorados" },
    { number: 0, target: 1000, label: "Usuários ativos" }
  ]);

  React.useEffect(() => {
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

  return React.createElement('section', { className: 'stats-section' },
    React.createElement('div', { className: 'container' },
      React.createElement('h2', { className: 'section-title' }, 'Oceanos em Números'),
      React.createElement('div', { className: 'stats-grid' },
        stats.map((stat, index) =>
          React.createElement('div', { key: index, className: 'stat-card' },
            React.createElement('div', { className: 'stat-number' }, 
              stat.number.toLocaleString('pt-BR')
            ),
            React.createElement('div', { className: 'stat-label' }, stat.label)
          )
        )
      )
    )
  );
};

// Componente de recursos
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

  return React.createElement('section', { className: 'features-section' },
    React.createElement('div', { className: 'container' },
      React.createElement('h2', { className: 'section-title' }, 'Recursos do AquaSite'),
      React.createElement('div', { className: 'features-grid' },
        features.map((feature, index) =>
          React.createElement('div', { key: index, className: 'feature-card' },
            React.createElement('h3', null, feature.title),
            React.createElement('p', null, feature.description)
          )
        )
      )
    )
  );
};

// Componente de depoimentos
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marina Silva",
      role: "Bióloga Marinha",
      text: "O AquaSite é uma ferramenta incrível para educação marinha. Uso com meus alunos!",
      avatar: "👩‍🔬"
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
      avatar: "👩‍🎓"
    }
  ];

  return React.createElement('section', { className: 'testimonials-section' },
    React.createElement('div', { className: 'container' },
      React.createElement('h2', { className: 'section-title' }, 'O que dizem sobre nós'),
      React.createElement('div', { className: 'testimonials-grid' },
        testimonials.map((testimonial, index) =>
          React.createElement('div', { key: index, className: 'testimonial-card' },
            React.createElement('div', { className: 'testimonial-avatar' }, testimonial.avatar),
            React.createElement('p', { className: 'testimonial-text' }, `"${testimonial.text}"`),
            React.createElement('div', { className: 'testimonial-author' },
              React.createElement('strong', null, testimonial.name),
              React.createElement('span', null, testimonial.role)
            )
          )
        )
      )
    )
  );
};

// Header melhorado
const HeaderMelhorado = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return React.createElement('header', { className: 'header-melhorado' },
    React.createElement('div', { className: 'header-container' },
      React.createElement('div', { className: 'logo-container' },
        React.createElement('img', { src: './img/logo.png', alt: 'AquaSite Logo', className: 'logo' }),
        React.createElement('span', { className: 'logo-text' }, 'AquaSite')
      ),
      React.createElement('nav', { className: `navbar ${isMenuOpen ? 'active' : ''}` },
        React.createElement('a', { href: '#home' }, '• Início'),
        React.createElement('a', { href: 'sobre.html' }, '• Sobre'),
        React.createElement('a', { href: 'curiosidades-melhorado.html' }, '• Explorar'),
        React.createElement('a', { href: 'http://wa.me/551140028922' }, '• Contato')
      ),
      React.createElement('div', { className: 'header-actions' },
        React.createElement('a', { href: 'login-react.html', className: 'btn-login' }, '→ Entrar'),
        React.createElement('button', { 
          className: 'menu-toggle',
          onClick: () => setIsMenuOpen(!isMenuOpen)
        }, '☰')
      )
    )
  );
};

// Footer melhorado
const FooterMelhorado = () => {
  return React.createElement('footer', { className: 'footer-melhorado' },
    React.createElement('div', { className: 'footer-container' },
      React.createElement('div', { className: 'footer-section' },
        React.createElement('h3', null, 'AquaSite'),
        React.createElement('p', null, 'Explorando os mistérios dos oceanos e promovendo a conservação marinha.')
      ),
      React.createElement('div', { className: 'footer-section' },
        React.createElement('h4', null, 'Links Rápidos'),
        React.createElement('ul', null,
          React.createElement('li', null, React.createElement('a', { href: 'sobre.html' }, 'Sobre')),
          React.createElement('li', null, React.createElement('a', { href: 'curiosidades-melhorado.html' }, 'Curiosidades')),
          React.createElement('li', null, React.createElement('a', { href: 'login-react.html' }, 'Login'))
        )
      ),
      React.createElement('div', { className: 'footer-section' },
        React.createElement('h4', null, 'Contato'),
        React.createElement('p', null, 'contato@aquasite.com'),
        React.createElement('p', null, '(11) 4002-8922')
      )
    ),
    React.createElement('div', { className: 'footer-bottom' },
      React.createElement('p', null, '© 2024 AquaSite. Todos os direitos reservados.')
    )
  );
};

// Aplicação principal melhorada
const IndexMelhorado = () => {
  return React.createElement('div', { className: 'index-melhorado fade-in' },
    React.createElement(HeaderMelhorado),
    React.createElement('main', null,
      React.createElement(HeroSection),
      React.createElement(StatsSection),
      React.createElement(FeaturesSection),
      React.createElement(TestimonialsSection)
    ),
    React.createElement(FooterMelhorado)
  );
};

// Componente de Loading
const LoadingScreen = () => {
  const [progress, setProgress] = React.useState(0);
  const [loadingText, setLoadingText] = React.useState('Carregando...');

  React.useEffect(() => {
    const texts = [
      'Explorando oceanos...',
      'Carregando vida marinha...',
      'Quase pronto!'
    ];
    
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    const textTimer = setInterval(() => {
      setLoadingText(texts[Math.floor(Math.random() * texts.length)]);
    }, 400);

    return () => {
      clearInterval(progressTimer);
      clearInterval(textTimer);
    };
  }, []);

  return React.createElement('div', { className: 'loading-screen' },
    React.createElement('div', { className: 'loading-content' },
      React.createElement('div', { className: 'loading-logo' },
        React.createElement('div', { className: 'wave-container' },
          React.createElement('div', { className: 'wave wave1' }),
          React.createElement('div', { className: 'wave wave2' }),
          React.createElement('div', { className: 'wave wave3' })
        ),
        React.createElement('div', { className: 'logo-text' }, 'AquaSite')
      ),
      React.createElement('div', { className: 'loading-progress' },
        React.createElement('div', { className: 'progress-bar' },
          React.createElement('div', { 
            className: 'progress-fill',
            style: { width: `${progress}%` }
          })
        ),
        React.createElement('div', { className: 'progress-text' }, `${Math.round(progress)}%`)
      ),
      React.createElement('div', { className: 'loading-text' }, loadingText)
    )
  );
};

// App principal com loading
const AppMelhorado = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return React.createElement(LoadingScreen);
  }

  return React.createElement(IndexMelhorado);
};