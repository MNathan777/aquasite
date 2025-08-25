// Componente de Login Melhorado
const LoginComponent = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [statusMsg, setStatusMsg] = React.useState('');
  const [statusColor, setStatusColor] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!username.trim() || !password) {
      setStatusMsg('Preencha todos os campos.');
      setStatusColor('#ffa726');
      setIsLoading(false);
      return;
    }

    if (password.length < 3) {
      setStatusMsg('Senha deve ter pelo menos 3 caracteres.');
      setStatusColor('#ffa726');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      if (isLogin) {
        const storedUser = localStorage.getItem(username);
        if (storedUser && JSON.parse(storedUser).password === password) {
          localStorage.setItem('currentUser', username);
          setStatusMsg(`Bem-vindo, ${username}!`);
          setStatusColor('#4ecdc4');
          setTimeout(() => {
            window.location.href = 'home-melhorado.html';
          }, 1200);
        } else {
          setStatusMsg('Usuário ou senha incorretos.');
          setStatusColor('#ff6b6b');
        }
      } else {
        if (localStorage.getItem(username)) {
          setStatusMsg('Usuário já existe.');
          setStatusColor('#ffa726');
        } else {
          localStorage.setItem(username, JSON.stringify({ password }));
          setStatusMsg('Cadastro realizado com sucesso!');
          setStatusColor('#4ecdc4');
          setTimeout(() => {
            setIsLogin(true);
            setStatusMsg('');
            setPassword('');
          }, 1500);
        }
      }
      setIsLoading(false);
    }, 600);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setStatusMsg('');
    setPassword('');
  };

  const voltar = () => {
    window.history.back();
  };

  return React.createElement('div', { className: 'login-container-melhorado' },
    React.createElement('div', { className: 'ocean-waves' }),
    
    React.createElement('button', { 
      className: 'btn-voltar-melhorado', 
      onClick: voltar,
      'aria-label': 'Voltar'
    }, '← Voltar'),
    
    React.createElement('div', { className: 'login-card' },
      React.createElement('div', { className: 'login-header' },
        React.createElement('div', { className: 'login-icon' }, '• AquaSite'),
        React.createElement('h2', null, isLogin ? 'Entrar' : 'Criar Conta'),
        React.createElement('p', null, isLogin ? 'Acesse sua conta no AquaSite' : 'Junte-se à comunidade oceânica')
      ),
      
      React.createElement('form', { onSubmit: handleSubmit, className: 'login-form' },
        React.createElement('input', {
          type: 'text',
          value: username,
          onChange: (e) => setUsername(e.target.value),
          placeholder: 'Nome de usuário',
          required: true,
          className: 'input-field'
        }),
        
        React.createElement('div', { className: 'input-wrapper' },
          React.createElement('input', {
            type: showPassword ? 'text' : 'password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            placeholder: 'Senha',
            required: true,
            className: 'input-field'
          }),
          React.createElement('button', {
            type: 'button',
            className: 'password-toggle',
            onClick: () => setShowPassword(!showPassword)
          }, showPassword ? 'Ocultar' : 'Mostrar')
        ),
        
        React.createElement('button', { 
          type: 'submit', 
          className: `submit-btn ${isLoading ? 'loading' : ''}`,
          disabled: isLoading
        }, isLoading ? 'Processando...' : (isLogin ? 'Entrar' : 'Cadastrar'))
      ),
      
      React.createElement('div', { className: 'toggle-section' },
        React.createElement('p', null,
          isLogin ? 'Não tem conta? ' : 'Já tem conta? ',
          React.createElement('a', { 
            href: '#', 
            onClick: (e) => { e.preventDefault(); toggleMode(); },
            className: 'toggle-link'
          }, isLogin ? 'Cadastre-se' : 'Fazer Login')
        )
      ),
      
      statusMsg && React.createElement('div', { 
        className: 'status-message',
        style: { color: statusColor }
      }, statusMsg)
    )
  );
};

// Componente principal do Login
const LoginApp = () => {
  return React.createElement('div', { className: 'login-app' },
    React.createElement(LoginComponent)
  );
};