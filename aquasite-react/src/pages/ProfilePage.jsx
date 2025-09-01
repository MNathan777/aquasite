import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [userProfile, setUserProfile] = useState({
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

  const loadUserProfile = (username) => {
    const savedProfile = localStorage.getItem(`profile_${username}`);
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else {
      const defaultProfile = {
        username: username,
        email: `${username}@aquasite.com`,
        bio: 'Apaixonado pela vida marinha e conservação dos oceanos.',
        joinDate: new Date().toLocaleDateString('pt-BR'),
        postsCount: Math.floor(Math.random() * 50) + 5,
        followersCount: Math.floor(Math.random() * 200) + 10,
        followingCount: Math.floor(Math.random() * 100) + 5
      };
      setUserProfile(defaultProfile);
      localStorage.setItem(`profile_${username}`, JSON.stringify(defaultProfile));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userProfile });
  };

  const handleSave = () => {
    setUserProfile(editData);
    localStorage.setItem(`profile_${currentUser}`, JSON.stringify(editData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
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
            <h1>{userProfile.username}</h1>
            <p className="join-date">Membro desde {userProfile.joinDate}</p>
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
          <div className="stat-item">
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
      </div>
    </div>
  );
};

export default ProfilePage