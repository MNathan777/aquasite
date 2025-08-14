const form = document.getElementById('form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const toggleLink = document.getElementById('toggle-link');
const toggleMsg = document.getElementById('toggle-msg');
const statusMsg = document.getElementById('status-msg');

let isLogin = true;

function updateToggleLink() {
  toggleMsg.innerHTML = isLogin
    ? 'Não tem conta? <a href="#" id="toggle-link">Cadastre-se</a>'
    : 'Já tem conta? <a href="#" id="toggle-link">Entrar</a>';

  document.getElementById('toggle-link').addEventListener('click', (e) => {
    e.preventDefault();
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? 'Login' : 'Cadastro';
    submitBtn.textContent = isLogin ? 'Entrar' : 'Cadastrar';
    updateToggleLink();
  });
}

updateToggleLink();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !password) {
    statusMsg.textContent = 'Preencha todos os campos.';
    statusMsg.style.color = "orange";
    return;
  }

  if (isLogin) {
    const storedUser = localStorage.getItem(username);
    if (storedUser && JSON.parse(storedUser).password === password) {
      localStorage.setItem('currentUser', username);
      statusMsg.textContent = `Bem-vindo, ${username}!`;
      statusMsg.style.color = "lightgreen";
      setTimeout(() => {
        window.location.href = "home-melhorado.html";
      }, 1500);
    } else {
      statusMsg.textContent = 'Usuário ou senha incorretos.';
      statusMsg.style.color = "red";
    }
  } else {
    if (localStorage.getItem(username)) {
      statusMsg.textContent = 'Usuário já existe.';
      statusMsg.style.color = "orange";
    } else {
      localStorage.setItem(username, JSON.stringify({ password }));
      statusMsg.textContent = 'Cadastro realizado com sucesso!';
      statusMsg.style.color = "lightgreen";
    }
  }
});
if (isLogin) {
  const storedUser = localStorage.getItem(username);
  if (storedUser && JSON.parse(storedUser).password === password) {
    window.location.href = "index.html"; // Redireciona para a home
  } else {
    statusMsg.textContent = 'Usuário ou senha incorretos.';
    statusMsg.style.color = "red";
  }
}

