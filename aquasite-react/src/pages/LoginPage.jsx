import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [statusColor, setStatusColor] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
            navigate('/home');
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

  return (
    <div className="login-app">
      <div className="login-container-melhorado">
        <div className="ocean-waves" />
        
        <button 
          className="btn-voltar-melhorado" 
          onClick={() => navigate(-1)}
          aria-label="Voltar"
        >
          ← Voltar
        </button>
        
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">• AquaSite</div>
            <h2>{isLogin ? 'Entrar' : 'Criar Conta'}</h2>
            <p>{isLogin ? 'Acesse sua conta no AquaSite' : 'Junte-se à comunidade oceânica'}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nome de usuário"
              required
              className="input-field"
            />
            
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
                className="input-field"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            
            <button 
              type="submit" 
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Processando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
            </button>
          </form>
          
          <div className="toggle-section">
            <p>
              {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); toggleMode(); }}
                className="toggle-link"
              >
                {isLogin ? 'Cadastre-se' : 'Fazer Login'}
              </a>
            </p>
          </div>
          
          {statusMsg && (
            <div 
              className="status-message"
              style={{ color: statusColor }}
            >
              {statusMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage