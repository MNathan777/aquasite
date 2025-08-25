// Componente Sobre Melhorado
const SobreMelhorado = () => {
  const [activeSection, setActiveSection] = React.useState(0);

  const sections = [
    {
      title: "Nossa Missão",

      content: "Conectar pessoas ao mundo marinho através da tecnologia, promovendo educação, conscientização e ações concretas para a preservação dos oceanos."
    },
    {
      title: "Nossa História", 

      content: "Fundado por entusiastas da vida marinha, o AquaSite nasceu da necessidade de criar uma plataforma que unisse ciência, educação e comunidade em prol dos oceanos."
    },
    {
      title: "Nossos Valores",
 
      content: "Sustentabilidade, educação acessível, inovação tecnológica e respeito pela biodiversidade marinha guiam cada decisão que tomamos."
    },
    {
      title: "Impacto",

      content: "Mais de 1000 usuários ativos, centenas de espécies catalogadas e uma comunidade crescente de defensores dos oceanos."
    }
  ];

  const team = [
    {
      name: "Dr. Marina Silva",
      role: "Bióloga Marinha",
      description: "Especialista em ecossistemas marinhos com 15 anos de experiência em conservação.",
      avatar: "👩‍🔬"
    },
    {
      name: "João Santos",
      role: "Desenvolvedor",
      description: "Apaixonado por tecnologia e oceanos, criador da plataforma AquaSite.",
      avatar: "👨‍💻"
    },
    {
      name: "Ana Costa",
      role: "Educadora",
      description: "Especialista em educação ambiental e comunicação científica.",
      avatar: "👩‍🏫"
    }
  ];

  const voltar = () => {
    window.history.back();
  };

  return React.createElement('div', { className: 'sobre-app' },
    React.createElement('button', { 
      className: 'btn-voltar-sobre', 
      onClick: voltar 
    }, 'Voltar'),

    React.createElement('div', { className: 'sobre-container-melhorado' },
      React.createElement('header', { className: 'sobre-header' },
        React.createElement('h1', null, 'Quem Somos'),
        React.createElement('p', { className: 'sobre-subtitle' }, 
          'Conectando pessoas aos oceanos através da tecnologia e educação'
        )
      ),

      React.createElement('div', { className: 'sobre-content' },
        React.createElement('div', { className: 'sections-grid' },
          sections.map((section, index) =>
            React.createElement('div', { 
              key: index,
              className: `section-card ${activeSection === index ? 'active' : ''}`,
              onClick: () => setActiveSection(index)
            },

              React.createElement('h3', null, section.title),
              React.createElement('p', null, section.content)
            )
          )
        ),

        React.createElement('div', { className: 'team-section' },
          React.createElement('h2', null, 'Nossa Equipe'),
          React.createElement('div', { className: 'team-grid' },
            team.map((member, index) =>
              React.createElement('div', { key: index, className: 'team-card' },

                React.createElement('h4', null, member.name),
                React.createElement('span', { className: 'team-role' }, member.role),
                React.createElement('p', null, member.description)
              )
            )
          )
        ),

        React.createElement('div', { className: 'stats-section' },
          React.createElement('h2', null, 'Nosso Impacto'),
          React.createElement('div', { className: 'stats-grid' },
            React.createElement('div', { className: 'stat-item' },
              React.createElement('span', { className: 'stat-number' }, '1000+'),
              React.createElement('span', { className: 'stat-label' }, 'Usuários Ativos')
            ),
            React.createElement('div', { className: 'stat-item' },
              React.createElement('span', { className: 'stat-number' }, '500+'),
              React.createElement('span', { className: 'stat-label' }, 'Espécies Catalogadas')
            ),
            React.createElement('div', { className: 'stat-item' },
              React.createElement('span', { className: 'stat-number' }, '50+'),
              React.createElement('span', { className: 'stat-label' }, 'Projetos de Conservação')
            )
          )
        ),

        React.createElement('div', { className: 'cta-section' },
          React.createElement('h2', null, 'Junte-se a Nós'),
          React.createElement('p', null, 'Faça parte da maior comunidade de defensores dos oceanos'),
          React.createElement('div', { className: 'cta-buttons' },
            React.createElement('a', { href: 'login-react.html', className: 'btn btn-primary' }, 'Criar Conta →'),
            React.createElement('a', { href: 'curiosidades-melhorado.html', className: 'btn btn-secondary' }, 'Explorar •')
          )
        )
      )
    )
  );
};

// Componente principal
const SobreApp = () => {
  return React.createElement(SobreMelhorado);
};