// Componente Header
const Header = () => {
  return React.createElement('header', { className: 'header' },
    React.createElement('section', null,
      React.createElement('a', { href: '#', className: 'logo' },
        React.createElement('img', { src: './img/logo.png', height: '150px', alt: 'Logo' })
      ),
      React.createElement('nav', { className: 'navbar' },
        React.createElement('a', { href: 'sobre.html' }, 'Sobre'),
        React.createElement('a', { href: 'curiosidades-melhorado.html' }, 'Curiosidades'),
        React.createElement('a', { href: 'http://wa.me/551140028922' }, 'Contato')
      ),
      React.createElement('div', { className: 'icons' },
        React.createElement('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '50',
          height: '50',
          viewBox: '0,0,256,256'
        },
          React.createElement('g', { fill: '#ffffff', fillRule: 'nonzero', stroke: 'none' },
            React.createElement('g', { transform: 'scale(5.12,5.12)' },
              React.createElement('path', {
                d: 'M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z'
              })
            )
          )
        )
      )
    )
  );
};

// Componente Home
const Home = () => {
  return React.createElement('div', { className: 'home-container' },
    React.createElement('section', { id: 'home' },
      React.createElement('div', { className: 'content' },
        React.createElement('h3', null, 'Bem-vindo ao Aqua Site'),
        React.createElement('p', null, 'Explore o mundo da vida marinha com a gente. Descubra curiosidades, imagens incríveis e muito mais sobre o oceano!'),
        React.createElement('a', { href: 'login-react.html', className: 'btn home-btn' }, 'Entre aqui')
      )
    )
  );
};

// Componente Feed para a página home
const Feed = () => {
  const [posts, setPosts] = React.useState([
    { id: 1, user: '@oceano_lindo', content: 'Olhem só esse pôr do sol sobre o mar! 🌅🌊' },
    { id: 2, user: '@vida_submarina', content: 'Hoje vi uma tartaruga marinha nadando entre os corais! 🐢💙' }
  ]);

  return React.createElement('div', { className: 'feed' },
    posts.map(post =>
      React.createElement('div', { key: post.id, className: 'post' },
        React.createElement('h3', null, post.user),
        React.createElement('p', null, post.content)
      )
    )
  );
};

// Componente Chat
const Chat = () => {
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');

  const enviarMensagem = () => {
    if (inputValue.trim()) {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      enviarMensagem();
    }
  };

  return React.createElement('div', { className: 'sidebar' },
    React.createElement('h3', null, 'Chat'),
    React.createElement('div', { className: 'chat-box' },
      React.createElement('div', { className: 'chat-messages' },
        messages.map((msg, index) =>
          React.createElement('div', { key: index }, msg)
        )
      ),
      React.createElement('div', { className: 'chat-input' },
        React.createElement('input', {
          type: 'text',
          value: inputValue,
          onChange: (e) => setInputValue(e.target.value),
          onKeyPress: handleKeyPress,
          placeholder: 'Digite uma mensagem...'
        }),
        React.createElement('button', { onClick: enviarMensagem }, 'Enviar')
      )
    )
  );
};

// Componente principal da aplicação
const App = () => {
  return React.createElement('div', null,
    React.createElement(Header),
    React.createElement(Home)
  );
};

// Componente para página home (após login)
const HomeApp = () => {
  return React.createElement('div', null,
    React.createElement('header', null,
      React.createElement('h1', null, 'AquaSite'),
      React.createElement('nav', null,
        React.createElement('a', { href: 'index.html' }, 'Início'),
        React.createElement('a', { href: '#' }, 'Explorar'),
        React.createElement('a', { href: 'perfil.html' }, 'Perfil')
      )
    ),
    React.createElement('main', null,
      React.createElement(Feed),
      React.createElement(Chat)
    )
  );
};