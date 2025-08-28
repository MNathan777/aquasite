// Hook para posts
const usePosts = () => {
  const [posts, setPosts] = React.useState([
    { id: 1, user: '@oceano_lindo', content: 'Olhem só esse pôr do sol sobre o mar!', likes: 15, time: '2h', image: './img/pordosol.jpg', comments: [] },
    { id: 2, user: '@vida_submarina', content: 'Hoje vi uma tartaruga marinha nadando entre os corais!', likes: 23, time: '4h', comments: [] },
    { id: 3, user: '@mergulhador_pro', content: 'Descobri um novo recife de corais! As cores são incríveis!', likes: 8, time: '6h', comments: [] }
  ]);

  const addPost = (content, image = null) => {
    const currentUser = localStorage.getItem('currentUser');
    const newPost = {
      id: posts.length + 1,
      user: `@${currentUser}`,
      content,
      likes: 0,
      time: 'agora',
      image,
      comments: []
    };
    setPosts([newPost, ...posts]);
  };

  const likePost = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const addComment = (postId, comment) => {
    const currentUser = localStorage.getItem('currentUser');
    const newComment = {
      id: Date.now(),
      user: currentUser,
      text: comment,
      time: 'agora'
    };
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
    ));
  };

  return { posts, addPost, likePost, addComment };
};

// Componente de Post
const Post = ({ post, onLike, onComment }) => {
  const [showComments, setShowComments] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');

  const handleComment = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  return React.createElement('div', { className: 'post' },
    React.createElement('div', { className: 'post-header' },
      React.createElement('h3', null, post.user),
      React.createElement('span', { className: 'post-time' }, post.time)
    ),
    React.createElement('p', null, post.content),
    post.image && React.createElement('img', { src: post.image, alt: 'Post image', style: { width: '100%', borderRadius: '8px', marginTop: '12px' } }),
    React.createElement('div', { className: 'post-actions' },
      React.createElement('button', { 
        onClick: () => onLike(post.id),
        className: 'like-btn'
      }, `♥ ${post.likes}`),
      React.createElement('button', { 
        onClick: () => setShowComments(!showComments),
        className: 'comment-btn' 
      }, `Comentar (${post.comments.length})`),
      React.createElement('button', { className: 'share-btn' }, 'Compartilhar')
    ),
    showComments && React.createElement('div', { style: { marginTop: '12px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' } },
      post.comments.map(comment =>
        React.createElement('div', { key: comment.id, style: { marginBottom: '8px', fontSize: '14px' } },
          React.createElement('strong', { style: { color: '#00d4ff' } }, comment.user + ': '),
          comment.text
        )
      ),
      React.createElement('div', { style: { display: 'flex', gap: '8px', marginTop: '8px' } },
        React.createElement('input', {
          type: 'text',
          value: commentText,
          onChange: (e) => setCommentText(e.target.value),
          placeholder: 'Comentário...',
          style: { flex: 1, padding: '6px 12px', borderRadius: '16px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' },
          onKeyPress: (e) => e.key === 'Enter' && handleComment()
        }),
        React.createElement('button', { 
          onClick: handleComment,
          style: { padding: '6px 12px', background: '#00d4ff', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer' }
        }, 'Enviar')
      )
    )
  );
};

// Componente de criação de post
const CreatePost = ({ onSubmit }) => {
  const [content, setContent] = React.useState('');
  const [imageFile, setImageFile] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);
  const currentUser = localStorage.getItem('currentUser');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() || imagePreview) {
      onSubmit(content, imagePreview);
      setContent('');
      setImageFile(null);
      setImagePreview(null);
    }
  };

  return React.createElement('div', { className: 'create-post' },
    React.createElement('h3', null, `O que você está pensando, ${currentUser}?`),
    React.createElement('form', { onSubmit: handleSubmit },
      React.createElement('textarea', {
        value: content,
        onChange: (e) => setContent(e.target.value),
        placeholder: 'Compartilhe algo sobre o oceano...',
        rows: 3
      }),
      imagePreview && React.createElement('div', { className: 'image-preview', style: { position: 'relative' } },
        React.createElement('img', { src: imagePreview, alt: 'Preview', style: { width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginTop: '10px' } }),
        React.createElement('button', { 
          type: 'button', 
          onClick: () => { setImagePreview(null); setImageFile(null); },
          style: { position: 'absolute', top: '15px', right: '5px', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer' }
        }, '×')
      ),
      React.createElement('div', { className: 'post-controls', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' } },
        React.createElement('input', {
          type: 'file',
          accept: 'image/*',
          onChange: handleImageChange,
          style: { display: 'none' },
          id: 'image-upload'
        }),
        React.createElement('label', { 
          htmlFor: 'image-upload',
          style: { cursor: 'pointer', padding: '8px 16px', background: 'rgba(0,212,255,0.2)', borderRadius: '20px', color: '#00d4ff', border: 'none' }
        }, '📷 Foto'),
        React.createElement('button', { type: 'submit', className: 'post-btn' }, 'Publicar •')
      )
    )
  );
};

// Componente de Chat melhorado
const Chat = () => {
  const [messages, setMessages] = React.useState([
    { id: 1, user: 'Sistema', text: 'Bem-vindo ao chat!', time: '10:00' },
    { id: 2, user: 'Marina', text: 'Alguém viu baleias hoje?', time: '10:15' }
  ]);
  const [inputValue, setInputValue] = React.useState('');
  const currentUser = localStorage.getItem('currentUser');

  const sendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: currentUser,
        text: inputValue,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return React.createElement('div', { className: 'chat-container' },
    React.createElement('h3', null, 'Chat Oceânico'),
    React.createElement('div', { className: 'chat-messages' },
      messages.map(msg =>
        React.createElement('div', { key: msg.id, className: 'message' },
          React.createElement('strong', null, `${msg.user}: `),
          React.createElement('span', null, msg.text),
          React.createElement('small', { className: 'message-time' }, msg.time)
        )
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
      React.createElement('button', { onClick: sendMessage }, 'Enviar')
    )
  );
};

// Componente de Sidebar com widgets
const Sidebar = () => {
  const [weather, setWeather] = React.useState({ temp: '24°C', condition: 'Ondas calmas' });
  const [onlineUsers] = React.useState(['Marina', 'João', 'Ana', 'Pedro']);

  return React.createElement('div', { className: 'sidebar' },
    React.createElement('div', { className: 'widget weather-widget' },
      React.createElement('h4', null, 'Condições do Mar'),
      React.createElement('p', null, weather.temp),
      React.createElement('p', null, weather.condition)
    ),
    
    React.createElement('div', { className: 'widget users-widget' },
      React.createElement('h4', null, 'Usuários Online'),
      React.createElement('ul', null,
        onlineUsers.map((user, index) =>
          React.createElement('li', { key: index },
            React.createElement('span', { className: 'online-dot' }),
            user
          )
        )
      )
    ),

    React.createElement(Chat)
  );
};

// Componente principal da Home
const HomeMelhorado = () => {
  const { posts, addPost, likePost, addComment } = usePosts();
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
    return React.createElement('div', { className: 'loading' }, 'Carregando...');
  }

  return React.createElement('div', { className: 'home-container' },
    React.createElement('header', { className: 'home-header' },
      React.createElement('div', { className: 'header-content' },
        React.createElement('h1', null, 'AquaSite'),
        React.createElement('nav', null,
          React.createElement('a', { href: 'index.html' }, '• Início'),
          React.createElement('a', { href: 'curiosidades-melhorado.html' }, '• Explorar'),
          React.createElement('a', { href: 'perfil.html' }, '• Perfil'),
          React.createElement('span', { className: 'user-info' }, `Olá, ${currentUser}!`),
          React.createElement('button', { onClick: logout, className: 'logout-btn' }, '→ Sair')
        )
      )
    ),

    React.createElement('main', { className: 'home-main' },
      React.createElement('div', { className: 'feed-container' },
        React.createElement(CreatePost, { onSubmit: addPost }),
        React.createElement('div', { className: 'posts-feed' },
          posts.map(post =>
            React.createElement(Post, { 
              key: post.id, 
              post: post, 
              onLike: likePost,
              onComment: addComment
            })
          )
        )
      ),
      React.createElement(Sidebar)
    )
  );
};

// Aplicação principal
const HomeApp = () => {
  return React.createElement(HomeMelhorado);
};