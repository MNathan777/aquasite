const API_BASE_URL = 'http://localhost:8080/api/cadastro'

class ApiService {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const token = localStorage.getItem('token')
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro na requisição')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  static async login(nome, senha) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ nome, senha })
    })
  }

  static async register(nome, senha) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nome, senha })
    })
  }

  static async checkUserExists(nome) {
    try {
      return this.request(`/user/check/${nome}`)
    } catch (error) {
      return { exists: false }
    }
  }

  static async getUserProfile() {
    return this.request('/user/profile')
  }

  static async getMarineLife() {
    return this.request('/marine-life')
  }

  // Métodos de perfil
  static async getProfile(nome) {
    const response = await fetch(`http://localhost:8080/api/usuario/perfil/${nome}`);
    if (!response.ok) throw new Error('Perfil não encontrado');
    return response.json();
  }

  static async updateProfile(id, profileData) {
    const response = await fetch(`http://localhost:8080/api/usuario/atualizar/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });
    if (!response.ok) throw new Error('Erro ao atualizar perfil');
    return response.json();
  }

  static async updateProfileByName(nome, profileData) {
    const response = await fetch(`http://localhost:8080/api/usuario/atualizar/nome/${nome}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });
    if (!response.ok) throw new Error('Erro ao atualizar perfil');
    return response.json();
  }

  static async criarPost(nome, conteudo) {
    const url = `http://localhost:8080/api/usuario/post?nome=${nome}&conteudo=${encodeURIComponent(conteudo)}`;
    console.log('Criando post - URL:', url);
    
    const response = await fetch(url, {
      method: 'POST'
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na resposta:', errorText);
      throw new Error('Erro ao criar post: ' + response.status);
    }
    
    const result = await response.json();
    console.log('Post criado:', result);
    return result;
  }

  static async seguirUsuario(seguidor, seguido) {
    const response = await fetch(`http://localhost:8080/api/usuario/seguir?seguidor=${seguidor}&seguido=${seguido}`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Erro ao seguir usuário');
    return response.json();
  }

  static async buscarPostsDoUsuario(nome) {
    const response = await fetch(`http://localhost:8080/api/usuario/posts/${nome}`);
    if (!response.ok) throw new Error('Erro ao buscar posts');
    return response.json();
  }

  static async deletarPost(postId) {
    const response = await fetch(`http://localhost:8080/api/usuario/post/${postId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erro ao deletar post');
    return response.json();
  }
}

export default ApiService