function enviarMensagem() {
  const input = document.getElementById('chatInput');
  const mensagens = document.getElementById('chatMessages');
  const texto = input.value.trim();
  if (texto !== '') {
    const novaMsg = document.createElement('p');
    novaMsg.textContent = texto;
    mensagens.appendChild(novaMsg);
    input.value = '';
    mensagens.scrollTop = mensagens.scrollHeight;
  }
}
