// Componente de Perfil Melhorado
const PerfilMelhorado = () => {
  const [currentUser, setCurrentUser] = React.useState('');
  const [userProfile, setUserProfile] = React.useState({
    username: '',
    email: '',
    bio: '',
    joinDate: '',
    postsCount: 0,
    followersCount: 0,
    followingCount: 0
  });
  const [isEditing, setIsEditing] = React.useState(false);
  const [editData, setEditData] = React.useState({});

  React.useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      window.location.href = 'login-react.html';
    } else {
      setCurrentUser(user);
      loadUserProfile(user);
    }
  }, []);

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
    window.location.href = 'index.html';
  };

  const voltar = () => {
    window.history.back();
  };

  return React.createElement('div', { className: 'perfil-app' },
    React.createElement('div', { className: 'perfil-container-melhorado' },
      React.createElement('button', { 
        className: 'btn-voltar-perfil', 
        onClick: voltar 
      }, '← Voltar'),

      React.createElement('div', { className: 'perfil-header' },
        React.createElement('div', { className: 'avatar-section' },
          React.createElement('div', { className: 'avatar-container' },
            React.createElement('img', { 
              src: 'img/avatar.png', 
              alt: 'Avatar', 
              className: 'avatar-melhorado' 
            }),
            React.createElement('div', { className: 'status-indicator' })
          )
        ),
        React.createElement('div', { className: 'user-info' },
          React.createElement('h1', null, userProfile.username),
          React.createElement('p', { className: 'join-date' }, `Membro desde ${userProfile.joinDate}`)
        ),
        React.createElement('div', { className: 'profile-actions' },
          React.createElement('button', { 
            className: 'edit-btn-corner',
            onClick: isEditing ? handleSave : handleEdit
          }, isEditing ? 'Salvar' : 'Editar'),
          isEditing && React.createElement('button', { 
            className: 'cancel-btn-corner',
            onClick: handleCancel
          }, 'Cancelar')
        )
      ),

      React.createElement('div', { className: 'stats-section' },
        React.createElement('div', { className: 'stat-item' },
          React.createElement('span', { className: 'stat-number' }, userProfile.postsCount),
          React.createElement('span', { className: 'stat-label' }, 'Posts')
        ),
        React.createElement('div', { className: 'stat-item' },
          React.createElement('span', { className: 'stat-number' }, userProfile.followersCount),
          React.createElement('span', { className: 'stat-label' }, 'Seguidores')
        ),
        React.createElement('div', { className: 'stat-item' },
          React.createElement('span', { className: 'stat-number' }, userProfile.followingCount),
          React.createElement('span', { className: 'stat-label' }, 'Seguindo')
        )
      ),

      React.createElement('div', { className: 'profile-content' },
        React.createElement('div', { className: 'info-card' },
          React.createElement('h3', null, 'Email'),
          isEditing 
            ? React.createElement('input', {
                type: 'email',
                value: editData.email || '',
                onChange: (e) => setEditData({...editData, email: e.target.value}),
                className: 'edit-input'
              })
            : React.createElement('p', null, userProfile.email)
        ),

        React.createElement('div', { className: 'info-card' },
          React.createElement('h3', null, 'Sobre mim'),
          isEditing 
            ? React.createElement('textarea', {
                value: editData.bio || '',
                onChange: (e) => setEditData({...editData, bio: e.target.value}),
                className: 'edit-textarea',
                rows: 4
              })
            : React.createElement('p', null, userProfile.bio)
        ),

        React.createElement('div', { className: 'achievements-card' },
          React.createElement('h3', null, 'Conquistas'),
          React.createElement('div', { className: 'achievements-grid' },
            React.createElement('div', { className: 'achievement' },
              React.createElement('span', null, 'Explorador'),
              React.createElement('small', null, 'Vida Marinha')
            ),
            React.createElement('div', { className: 'achievement' },
              React.createElement('span', null, 'Oceânico'),
              React.createElement('small', null, 'Ecossistemas')
            ),
            React.createElement('div', { className: 'achievement' },
              React.createElement('span', null, 'Estudioso'),
              React.createElement('small', null, 'Educação')
            ),
            React.createElement('div', { className: 'achievement' },
              React.createElement('span', null, 'Conservador'),
              React.createElement('small', null, 'Conservação')
            )
          )
        )
      )
    )
  );
};

// Componente principal
const PerfilApp = () => {
  return React.createElement(PerfilMelhorado);
};