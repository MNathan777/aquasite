// Componente de Login React Funcional
const LoginComponent = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [statusMsg, setStatusMsg] = React.useState('');
  const [statusColor, setStatusColor] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password) {
      setStatusMsg('Preencha todos os campos.');
      setStatusColor('orange');
      return;
    }

    if (isLogin) {
      const storedUser = localStorage.getItem(username);
      if (storedUser && JSON.parse(storedUser).password === password) {
        localStorage.setItem('currentUser', username);
        setStatusMsg(`Bem-vindo, ${username}!`);
        setStatusColor('lightgreen');
        setTimeout(() => {
          window.location.href = 'home-melhorado.html';
        }, 1500);
      } else {
        setStatusMsg('Usuário ou senha incorretos.');
        setStatusColor('red');
      }
    } else {
      if (localStorage.getItem(username)) {
        setStatusMsg('Usuário já existe.');
        setStatusColor('orange');
      } else {
        localStorage.setItem(username, JSON.stringify({ password }));
        setStatusMsg('Cadastro realizado com sucesso!');
        setStatusColor('lightgreen');
        setTimeout(() => {
          setIsLogin(true);
          setStatusMsg('');
          setPassword('');
        }, 2000);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setStatusMsg('');
    setPassword('');
  };

  const voltar = () => {
    window.history.back();
  };

  return React.createElement('div', { className: 'login-container' },
    React.createElement('button', { 
      className: 'btn-voltar-animado', 
      onClick: voltar,
      'aria-label': 'Voltar'
    }, '←'),
    
    React.createElement('h2', null, isLogin ? 'Login' : 'Cadastro'),
    
    React.createElement('form', { onSubmit: handleSubmit },
      React.createElement('input', {
        type: 'text',
        value: username,
        onChange: (e) => setUsername(e.target.value),
        placeholder: 'Usuário',
        required: true
      }),
      React.createElement('input', {
        type: 'password',
        value: password,
        onChange: (e) => setPassword(e.target.value),
        placeholder: 'Senha',
        required: true
      }),
      React.createElement('button', { 
        type: 'submit', 
        className: 'btn' 
      }, isLogin ? 'Entrar' : 'Cadastrar')
    ),
    
    React.createElement('p', null,
      isLogin ? 'Não tem conta? ' : 'Já tem conta? ',
      React.createElement('a', { 
        href: '#', 
        onClick: (e) => { e.preventDefault(); toggleMode(); }
      }, isLogin ? 'Cadastre-se' : 'Entrar')
    ),
    
    React.createElement('p', { 
      id: 'status-msg',
      style: { color: statusColor }
    }, statusMsg || '')
  );
};

// Componente principal do Login
const LoginApp = () => {
  return React.createElement(LoginComponent);
};