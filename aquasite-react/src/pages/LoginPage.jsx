import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './LoginPage.css'
import ApiService from '../services/api'

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')
  const [statusMsg, setStatusMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    if (!nome.trim() || !senha) {
      setStatusMsg('Preencha todos os campos.')
      setIsLoading(false)
      return
    }

    try {
      if (isLogin) {
        console.log('Fazendo login...')
        const data = await ApiService.login(nome, senha)
        console.log('Resposta login:', data)
        localStorage.setItem('token', data.token || 'fake-token')
        localStorage.setItem('currentUser', nome)
        setStatusMsg(`✓ Bem-vindo, ${nome}!`)
        setTimeout(() => {
          navigate('/home')
        }, 1200)
      } else {
        console.log('Fazendo registro...')
        const data = await ApiService.register(nome, senha)
        console.log('Resposta registro:', data)
        setStatusMsg('✓ Conta criada com sucesso!')
        setTimeout(() => {
          setIsLogin(true)
          setStatusMsg('')
          setSenha('')
        }, 1500)
      }
    } catch (error) {
      console.error('Erro no handleSubmit:', error)
      if (isLogin) {
        setStatusMsg('⚠ Usuário não cadastrado')
      } else {
        setStatusMsg(`⚠ ${error.message || 'Erro ao criar conta'}`)
      }
    }
    
    setIsLoading(false)
  }

  return (
    <div className="twitter-layout">
      <div className="left-section">
        <div className="hero-content-twitter">
          <h1 className="hero-title-twitter">AquaSite</h1>
        </div>
      </div>

      <div className="right-section">
        <div className="login-card-twitter">
          <div className="twitter-logo">🌊</div>
          
          <h1 className="main-heading">Explore o mundo marinho</h1>
          
          <h2 className="sub-heading">{isLogin ? 'Entre no AquaSite' : 'Crie sua conta'}</h2>
          
          <form onSubmit={handleSubmit} className="login-form-twitter">
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
              required
            />
            
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              required
            />
            
            <button type="submit" className="btn-submit-twitter" disabled={isLoading}>
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span className="spinner"></span>
                  {isLogin ? 'Entrando...' : 'Criando...'}
                </span>
              ) : (
                isLogin ? 'Entrar' : 'Criar conta'
              )}
            </button>
          </form>
          
          {statusMsg && (
            <div className="status-msg-twitter">{statusMsg}</div>
          )}
          
          <div className="toggle-section-twitter">
            <p style={{ color: '#71767b', marginBottom: '1rem' }}>
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            </p>
            <button 
              onClick={() => { setIsLogin(!isLogin); setStatusMsg(''); setSenha(''); }}
              className="toggle-btn"
            >
              {isLogin ? 'Inscrever-se' : 'Entrar'}
            </button>
          </div>
          
          <Link to="/curiosidades" className="btn-explore">
            Explorar sem fazer login
          </Link>
        </div>
      </div>
    </div>
  )
};

export default LoginPage