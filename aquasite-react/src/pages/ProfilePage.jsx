import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiService from '../services/api'

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [userProfile, setUserProfile] = useState({
    id: null,
    username: '',
    email: '',
    bio: '',
    joinDate: '',
    postsCount: 0,
    followersCount: 0,
    followingCount: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/login');
    } else {
      setCurrentUser(user);
      loadUserProfile(user);
    }
  }, [navigate]);

  const loadUserProfile = async (username) => {
    try {
      const profile = await ApiService.getProfile(username);
      setUserProfile({
        id: profile.id,
        username: profile.nome,
        email: profile.email,
        bio: profile.sobreMim || '',
        joinDate: new Date(profile.dataCadastro).toLocaleDateString('pt-BR'),
        postsCount: profile.posts || 0,
        followersCount: profile.seguidores || 0,
        followingCount: profile.seguindo || 0
      });
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      // Fallback para dados locais se API falhar
      const defaultProfile = {
        username: username,
        email: `${username}@aquasite.com`,
        bio: '',
        joinDate: new Date().toLocaleDateString('pt-BR'),
        postsCount: 0,
        followersCount: 0,
        followingCount: 0
      };
      setUserProfile(defaultProfile);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ 
      ...userProfile,
      id: userProfile.id // Garantir que o ID seja mantido
    });
  };

  const handleSave = async () => {
    try {
      const updateData = {
        nome: editData.username,
        email: editData.email,
        sobreMim: editData.bio,
        posts: editData.postsCount,
        seguidores: editData.followersCount,
        seguindo: editData.followingCount
      };
      
      console.log('Salvando perfil para:', currentUser, 'ID:', editData.id, 'Dados:', updateData);
      
      if (editData.id) {
        // Usar ID se disponível
        await ApiService.updateProfile(editData.id, updateData);
      } else {
        // Fallback para nome
        await ApiService.updateProfileByName(currentUser, updateData);
      }
      
      // Atualizar com o ID mantido
      setUserProfile({ ...editData, id: editData.id });
      setIsEditing(false);
      console.log('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      alert('Erro ao salvar perfil. Tente novamente.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;
    
    setIsCreatingPost(true);
    try {
      await ApiService.criarPost(currentUser, newPost);
      
      // Atualizar contador imediatamente
      setUserProfile(prev => ({
        ...prev,
        postsCount: prev.postsCount + 1
      }));
      
      setNewPost('');
      setShowPostModal(false);
      
      // Recarregar perfil do servidor para sincronizar
      setTimeout(() => {
        loadUserProfile(currentUser);
      }, 500);
      
      alert('Post criado com sucesso! Total de posts: ' + (userProfile.postsCount + 1));
    } catch (error) {
      console.error('Erro ao criar post:', error);
      alert('Erro ao criar post');
    } finally {
      setIsCreatingPost(false);
    }
  };

  return (
    <div className="perfil-app">
      <div className="perfil-container-melhorado">
        <button 
          className="btn-voltar-perfil" 
          onClick={() => navigate(-1)}
        >
          ← Voltar
        </button>

        <div className="perfil-header">
          <div className="avatar-section">
            <div className="avatar-container">
              <div className="avatar-melhorado">👤</div>
              <div className="status-indicator"></div>
            </div>
          </div>
          <div className="user-info">
            <h1>Perfil</h1>
            <p className="join-date">{userProfile.username} - Membro desde {userProfile.joinDate}</p>
          </div>
          <div className="profile-actions">
            <button 
              className="edit-btn-corner"
              onClick={isEditing ? handleSave : handleEdit}
            >
              {isEditing ? '💾' : '✏️'}
            </button>
            {isEditing && (
              <button 
                className="cancel-btn-corner"
                onClick={handleCancel}
              >
                ❌
              </button>
            )}
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item" onClick={() => setShowPostModal(true)} style={{cursor: 'pointer'}}>
            <span className="stat-number">{userProfile.postsCount}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{userProfile.followersCount}</span>
            <span className="stat-label">Seguidores</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{userProfile.followingCount}</span>
            <span className="stat-label">Seguindo</span>
          </div>
        </div>

        {showPostModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: '#1a2332',
              padding: '20px',
              borderRadius: '10px',
              width: '400px',
              maxWidth: '90vw'
            }}>
              <h3 style={{color: '#00bcd4', marginBottom: '15px'}}>Criar Novo Post</h3>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="O que você está pensando sobre o mundo marinho?"
                style={{
                  width: '100%',
                  height: '100px',
                  padding: '10px',
                  backgroundColor: '#2a3441',
                  border: '1px solid #00bcd4',
                  borderRadius: '5px',
                  color: 'white',
                  resize: 'vertical'
                }}
              />
              <div style={{marginTop: '15px', display: 'flex', gap: '10px'}}>
                <button
                  onClick={handleCreatePost}
                  disabled={isCreatingPost}
                  style={{
                    backgroundColor: isCreatingPost ? '#666' : '#00bcd4',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: isCreatingPost ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isCreatingPost ? 'Publicando...' : 'Publicar'}
                </button>
                <button
                  onClick={() => {setShowPostModal(false); setNewPost('');}}
                  style={{
                    backgroundColor: '#666',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="profile-content">
          <div className="info-card">
            <h3>Email</h3>
            {isEditing ? (
              <input
                type="email"
                value={editData.email || ''}
                onChange={(e) => setEditData({...editData, email: e.target.value})}
                className="edit-input"
              />
            ) : (
              <p>{userProfile.email}</p>
            )}
          </div>

          <div className="info-card">
            <h3>Sobre mim</h3>
            {isEditing ? (
              <textarea
                value={editData.bio || ''}
                onChange={(e) => setEditData({...editData, bio: e.target.value})}
                className="edit-textarea"
                rows={4}
              />
            ) : (
              <p>{userProfile.bio}</p>
            )}
          </div>

          <div className="achievements-card">
            <h3>Conquistas</h3>
            <div className="achievements-grid">
              <div className="achievement">
                <span>🐠 Explorador</span>
                <small>Vida Marinha</small>
              </div>
              <div className="achievement">
                <span>🌊 Oceânico</span>
                <small>Ecossistemas</small>
              </div>
              <div className="achievement">
                <span>📚 Estudioso</span>
                <small>Educação</small>
              </div>
              <div className="achievement">
                <span>🛡️ Conservador</span>
                <small>Conservação</small>
              </div>
            </div>
          </div>

          <div className="logout-section">
            <button className="logout-btn" onClick={logout}>
              Sair da Conta
            </button>
          </div>
        </div>
        
        {/* Botão flutuante para criar post */}
        <button
          onClick={() => setShowPostModal(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#00bcd4',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,188,212,0.3)',
            zIndex: 100
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProfilePage