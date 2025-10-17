# Comandos Git para subir o AquaSite

## 1. Inicializar repositório Git
```bash
cd C:\Users\leoma\Downloads\aquasite-main
git init
```

## 2. Adicionar arquivos
```bash
git add .
```

## 3. Fazer primeiro commit
```bash
git commit -m "Initial commit - AquaSite project with React frontend and API integration"
```

## 4. Conectar com repositório remoto
```bash
git remote add origin https://github.com/MNathan777/aquasite.git
```

## 5. Verificar branch principal
```bash
git branch -M main
```

## 6. Fazer push para GitHub
```bash
git push -u origin main
```

## Comandos para atualizações futuras:
```bash
# Adicionar mudanças
git add .

# Commit com mensagem
git commit -m "Descrição das mudanças"

# Push para GitHub
git push
```

## Estrutura que será enviada:
```
aquasite-main/
├── aquasite-react/          # Frontend React
│   ├── src/
│   │   ├── pages/           # Páginas (Login, Home, Profile, etc)
│   │   ├── services/        # API service
│   │   └── components/      # Componentes
│   ├── package.json
│   └── vite.config.js
├── API-EXAMPLE.md           # Documentação da API Spring Boot
└── GIT-COMMANDS.md          # Este arquivo
```