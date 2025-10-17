# 🌊 AquaSite - Plataforma de Vida Marinha

Uma plataforma interativa para explorar e compartilhar conhecimento sobre vida marinha e conservação dos oceanos.

## 🚀 Funcionalidades

- **Sistema de Login/Cadastro** com autenticação
- **Feed de Posts** para compartilhar descobertas marinhas
- **Perfil de Usuário** com estatísticas e conquistas
- **Exploração de Vida Marinha** com curiosidades
- **Chat em Tempo Real** entre usuários
- **Interface Responsiva** com efeitos visuais oceânicos

## 🛠️ Tecnologias

### Frontend
- **React** 18+ com Vite
- **React Router** para navegação
- **CSS3** com animações e gradientes
- **LocalStorage** para persistência local

### Backend (API)
- **Spring Boot** (Java)
- **Spring Data JPA** para banco de dados
- **H2/MySQL** para persistência
- **JWT** para autenticação

## 📦 Instalação

### Frontend
```bash
cd aquasite-react
npm install
npm run dev
```

### Backend
1. Configure sua API Spring Boot conforme `API-EXAMPLE.md`
2. Execute na porta 8080
3. Configure CORS para `http://localhost:5173`

## 🎯 Como Usar

1. **Cadastre-se** na plataforma
2. **Faça login** com suas credenciais
3. **Publique posts** sobre vida marinha
4. **Explore** curiosidades dos oceanos
5. **Interaja** com outros usuários no chat

## 📁 Estrutura do Projeto

```
aquasite-main/
├── aquasite-react/          # Frontend React
│   ├── src/
│   │   ├── pages/           # Páginas principais
│   │   ├── services/        # Integração com API
│   │   └── components/      # Componentes reutilizáveis
│   └── package.json
├── API-EXAMPLE.md           # Documentação da API
└── README.md               # Este arquivo
```

## 🌐 Páginas

- **/** - Página inicial com apresentação
- **/login** - Login e cadastro de usuários
- **/home** - Feed principal com posts
- **/perfil** - Perfil do usuário logado
- **/curiosidades** - Exploração de vida marinha
- **/sobre** - Informações sobre o projeto

## 🔧 Configuração da API

Consulte o arquivo `API-EXAMPLE.md` para implementar:
- Entidades Usuario e Post
- Controllers de autenticação
- Endpoints para posts e estatísticas
- Configuração do banco de dados

## 🎨 Características Visuais

- **Tema Oceânico** com gradientes azuis
- **Animações de Bolhas** interativas
- **Efeitos Hover** em todos os elementos
- **Design Responsivo** para mobile e desktop
- **Tipografia Amigável** com fonte Kalam

## 📱 Responsividade

O projeto é totalmente responsivo e funciona em:
- 📱 Smartphones
- 📱 Tablets
- 💻 Desktops
- 🖥️ Monitores grandes

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com 💙 para os oceanos 🌊