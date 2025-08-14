// Hook customizado para gerenciar posts
const usePosts = () => {
  const [posts, setPosts] = React.useState([
    { id: 1, user: '@oceano_lindo', content: 'Olhem só esse pôr do sol sobre o mar! 🌅🌊', likes: 15 },
    { id: 2, user: '@vida_submarina', content: 'Hoje vi uma tartaruga marinha nadando entre os corais! 🐢💙', likes: 23 }
  ]);

  const addPost = (content) => {
    const currentUser = localStorage.getItem('currentUser');
    const newPost = {
      id: posts.length + 1,
      user: `@${currentUser}`,
      content,
      likes: 0
    };
    setPosts([newPost, ...posts]);
  };

  const likePost = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return { posts, addPost, likePost };
};

// Componente Post interativo
const Post = ({ post, onLike }) => {
  return React.createElement('div', { className: 'post' },
    React.createElement('h3', null, post.user),
    React.createElement('p', null, post.content),
    React.createElement('div', { className: 'post-actions' },
      React.createElement('button', { 
        onClick: () => onLike(post.id),
        className: 'like-btn'
      }, `❤️ ${post.likes}`)
    )
  );
};

// Componente Feed avançado
const AdvancedFeed = () => {
  const { posts, addPost, likePost } = usePosts();
  const [newPostContent, setNewPostContent] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      addPost(newPostContent);
      setNewPostContent('');
    }
  };

  return React.createElement('div', { className: 'feed' },
    React.createElement('form', { onSubmit: handleSubmit, className: 'new-post-form' },
      React.createElement('textarea', {
        value: newPostContent,
        onChange: (e) => setNewPostContent(e.target.value),
        placeholder: 'Compartilhe algo sobre o oceano...',
        rows: 3
      }),
      React.createElement('button', { type: 'submit' }, 'Publicar')
    ),
    posts.map(post =>
      React.createElement(Post, { 
        key: post.id, 
        post: post, 
        onLike: likePost 
      })
    )
  );
};

// Componente de busca
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    if (searchTerm) {
      // Simula busca
      const mockResults = [
        'Golfinhos do Atlântico',
        'Corais do Caribe',
        'Tartarugas Marinhas'
      ].filter(item => 
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(mockResults);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  return React.createElement('div', { className: 'search-component' },
    React.createElement('input', {
      type: 'text',
      value: searchTerm,
      onChange: (e) => setSearchTerm(e.target.value),
      placeholder: 'Buscar vida marinha...'
    }),
    results.length > 0 && React.createElement('div', { className: 'search-results' },
      results.map((result, index) =>
        React.createElement('div', { key: index, className: 'search-result' }, result)
      )
    )
  );
};

// Aplicação completa com componentes avançados
const AdvancedApp = () => {
  const [currentUser, setCurrentUser] = React.useState('');

  React.useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      window.location.href = 'login-react.html';
    } else {
      setCurrentUser(user);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  };

  if (!currentUser) {
    return React.createElement('div', null, 'Carregando...');
  }

  return React.createElement('div', null,
    React.createElement('header', null,
      React.createElement('h1', null, 'AquaSite'),
      React.createElement('nav', null,
        React.createElement('a', { href: 'index.html' }, 'Início'),
        React.createElement('a', { href: '#' }, 'Explorar'),
        React.createElement('span', null, `Olá, ${currentUser}!`),
        React.createElement('button', { onClick: logout, className: 'logout-btn' }, 'Sair')
      ),
      React.createElement(SearchComponent)
    ),
    React.createElement('main', null,
      React.createElement(AdvancedFeed),
      React.createElement(Chat)
    )
  );
};