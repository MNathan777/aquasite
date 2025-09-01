import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const usePosts = () => {
  const [posts, setPosts] = useState([
    { id: 1, user: '@oceano_lindo', content: 'Olhem só esse pôr do sol sobre o mar!', likes: 15, time: '2h', image: null, comments: [] },
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

const Post = ({ post, onLike, onComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleComment = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <h3>{post.user}</h3>
        <span className="post-time">{post.time}</span>
      </div>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post" style={{ width: '100%', borderRadius: '8px', marginTop: '12px' }} />}
      <div className="post-actions">
        <button onClick={() => onLike(post.id)} className="like-btn">
          ♥ {post.likes}
        </button>
        <button onClick={() => setShowComments(!showComments)} className="comment-btn">
          Comentar ({post.comments.length})
        </button>
        <button className="share-btn">Compartilhar</button>
      </div>
      {showComments && (
        <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
          {post.comments.map(comment => (
            <div key={comment.id} style={{ marginBottom: '8px', fontSize: '14px' }}>
              <strong style={{ color: '#00d4ff' }}>{comment.user}: </strong>
              {comment.text}
            </div>
          ))}
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Comentário..."
              style={{ flex: 1, padding: '6px 12px', borderRadius: '16px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
              onKeyPress={(e) => e.key === 'Enter' && handleComment()}
            />
            <button 
              onClick={handleComment}
              style={{ padding: '6px 12px', background: '#00d4ff', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer' }}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CreatePost = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const currentUser = localStorage.getItem('currentUser');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
      setImagePreview(null);
    }
  };

  return (
    <div className="create-post">
      <h3>O que você está pensando, {currentUser}?</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Compartilhe algo sobre o oceano..."
          rows={3}
        />
        {imagePreview && (
          <div className="image-preview" style={{ position: 'relative' }}>
            <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginTop: '10px' }} />
            <button 
              type="button" 
              onClick={() => setImagePreview(null)}
              style={{ position: 'absolute', top: '15px', right: '5px', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer' }}
            >
              ×
            </button>
          </div>
        )}
        <div className="post-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <label 
            htmlFor="image-upload"
            style={{ cursor: 'pointer', padding: '8px 16px', background: 'rgba(0,212,255,0.2)', borderRadius: '20px', color: '#00d4ff', border: 'none' }}
          >
            📷 Foto
          </label>
          <button type="submit" className="post-btn">Publicar •</button>
        </div>
      </form>
    </div>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Sistema', text: 'Bem-vindo ao chat!', time: '10:00' },
    { id: 2, user: 'Marina', text: 'Alguém viu baleias hoje?', time: '10:15' }
  ]);
  const [inputValue, setInputValue] = useState('');
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

  return (
    <div className="chat-container">
      <h3>Chat Oceânico</h3>
      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className="message">
            <strong>{msg.user}: </strong>
            <span>{msg.text}</span>
            <small className="message-time">{msg.time}</small>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Digite uma mensagem..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [weather] = useState({ temp: '24°C', condition: 'Ondas calmas' });
  const [onlineUsers] = useState(['Marina', 'João', 'Ana', 'Pedro']);

  return (
    <div className="sidebar">
      <div className="widget weather-widget">
        <h4>Condições do Mar</h4>
        <p>{weather.temp}</p>
        <p>{weather.condition}</p>
      </div>
      
      <div className="widget users-widget">
        <h4>Usuários Online</h4>
        <ul>
          {onlineUsers.map((user, index) => (
            <li key={index}>
              <span className="online-dot"></span>
              {user}
            </li>
          ))}
        </ul>
      </div>

      <Chat />
    </div>
  );
};

const HomePage = () => {
  const { posts, addPost, likePost, addComment } = usePosts();
  const [currentUser, setCurrentUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/login');
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!currentUser) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>AquaSite</h1>
          <nav>
            <Link to="/">• Início</Link>
            <Link to="/curiosidades">• Explorar</Link>
            <Link to="/perfil">• Perfil</Link>
            <span className="user-info">Olá, {currentUser}!</span>
            <button onClick={logout} className="logout-btn">→ Sair</button>
          </nav>
        </div>
      </header>

      <main className="home-main">
        <div className="feed-container">
          <CreatePost onSubmit={addPost} />
          <div className="posts-feed">
            {posts.map(post => (
              <Post 
                key={post.id} 
                post={post} 
                onLike={likePost}
                onComment={addComment}
              />
            ))}
          </div>
        </div>
        <Sidebar />
      </main>
    </div>
  );
};

export default HomePage