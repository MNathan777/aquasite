// Dados do ecosistema marinho expandido
const ecosistemaData = [
  // Peixes Tropicais
  { id: 1, nome: "Peixe-Palhaço", tipo: "Peixe", profundidade: "1-15m", curiosidade: "Vive em simbiose com anêmonas-do-mar, sendo imune ao seu veneno.", imagem: "./img/peixe-palhaco.jpg", cor: "#FF6347" },
  { id: 2, nome: "Peixe-Anjo", tipo: "Peixe", profundidade: "1-100m", curiosidade: "Muda de cor e padrão conforme cresce e muda de sexo.", imagem: "./img/peixeanjo.webp", cor: "#FF69B4" },
  { id: 3, nome: "Peixe-Cirurgião", tipo: "Peixe", profundidade: "3-40m", curiosidade: "Possui espinhos venenosos nas nadadeiras para defesa.", imagem: "./img/peixecirurgiao.webp", cor: "#4169E1" },
  { id: 4, nome: "Peixe-Borboleta", tipo: "Peixe", profundidade: "1-30m", curiosidade: "Tem padrões únicos que confundem predadores.", imagem: "./img/peixeborboleta.webp", cor: "#FFD700" },
  { id: 5, nome: "Peixe-Papagaio", tipo: "Peixe", profundidade: "1-25m", curiosidade: "Produz areia ao mastigar corais, criando praias tropicais.", imagem: "./img/peixepapagaio.webp", cor: "#32CD32" },
  
  // Tubarões
  { id: 6, nome: "Tubarão Branco", tipo: "Peixe", profundidade: "0-1200m", curiosidade: "Predador apex com dentes que se regeneram constantemente.", imagem: "🦈", cor: "#708090" },
  { id: 7, nome: "Tubarão-Martelo", tipo: "Peixe", profundidade: "1-80m", curiosidade: "Sua cabeça em formato de martelo melhora a visão e detecção elétrica.", imagem: "🦈", cor: "#696969" },
  { id: 8, nome: "Tubarão-Baleia", tipo: "Peixe", profundidade: "0-700m", curiosidade: "O maior peixe do mundo, mas se alimenta apenas de plâncton.", imagem: "🦈", cor: "#4682B4" },
  { id: 9, nome: "Tubarão-Tigre", tipo: "Peixe", profundidade: "0-350m", curiosidade: "Conhecido como 'lixeira do mar' por comer quase qualquer coisa.", imagem: "🦈", cor: "#B8860B" },
  
  // Peixes de Profundidade
  { id: 10, nome: "Peixe-Lanterna", tipo: "Peixe", profundidade: "200-4000m", curiosidade: "Produz sua própria luz através de bioluminescência.", imagem: "🐟", cor: "#9400D3" },
  { id: 11, nome: "Peixe-Diabo", tipo: "Peixe", profundidade: "1000-4000m", curiosidade: "Tem uma isca luminosa para atrair presas no escuro abissal.", imagem: "🐟", cor: "#8B0000" },
  { id: 12, nome: "Peixe-Víbora", tipo: "Peixe", profundidade: "80-1600m", curiosidade: "Possui dentes tão grandes que não consegue fechar a boca.", imagem: "🐟", cor: "#2F4F4F" },
  
  // Raias e Similares
  { id: 13, nome: "Arraia-Manta", tipo: "Peixe", profundidade: "0-120m", curiosidade: "Pode ter envergadura de até 9 metros e é totalmente inofensiva.", imagem: "🐟", cor: "#000080" },
  { id: 14, nome: "Arraia-Elétrica", tipo: "Peixe", profundidade: "1-200m", curiosidade: "Pode gerar descargas elétricas de até 220 volts.", imagem: "🐟", cor: "#FFD700" },
  { id: 15, nome: "Peixe-Serra", tipo: "Peixe", profundidade: "1-40m", curiosidade: "Usa seu 'bico' serrilhado para atordoar peixes pequenos.", imagem: "🐟", cor: "#CD853F" },
  
  // Peixes Únicos
  { id: 16, nome: "Cavalo-Marinho", tipo: "Peixe", profundidade: "0-30m", curiosidade: "O macho é quem engravida e dá à luz aos filhotes.", imagem: "🐴", cor: "#F0E68C" },
  { id: 17, nome: "Peixe-Cofre", tipo: "Peixe", profundidade: "2-50m", curiosidade: "Tem corpo rígido em formato de caixa para proteção.", imagem: "🐟", cor: "#DEB887" },
  { id: 18, nome: "Peixe-Lua", tipo: "Peixe", profundidade: "0-600m", curiosidade: "O peixe ósseo mais pesado do mundo, pode pesar até 2 toneladas.", imagem: "🐟", cor: "#C0C0C0" },
  { id: 19, nome: "Peixe-Voador", tipo: "Peixe", profundidade: "0-50m", curiosidade: "Pode planar sobre a água por até 400 metros.", imagem: "🐟", cor: "#87CEEB" },
  { id: 20, nome: "Peixe-Agulha", tipo: "Peixe", profundidade: "0-100m", curiosidade: "Tem bico alongado e pode saltar fora da água.", imagem: "🐟", cor: "#4682B4" },
  
  // Peixes de Água Fria
  { id: 21, nome: "Bacalhau", tipo: "Peixe", profundidade: "150-600m", curiosidade: "Pode viver até 25 anos e é base da culinária nórdica.", imagem: "🐟", cor: "#708090" },
  { id: 22, nome: "Salmão", tipo: "Peixe", profundidade: "0-200m", curiosidade: "Migra milhares de quilômetros para desovar no local onde nasceu.", imagem: "🐟", cor: "#FA8072" },
  { id: 23, nome: "Atum", tipo: "Peixe", profundidade: "0-250m", curiosidade: "Pode nadar a velocidades de até 70 km/h.", imagem: "🐟", cor: "#B22222" },
  
  // Mamíferos Marinhos
  { id: 24, nome: "Baleia Azul", tipo: "Mamífero", profundidade: "0-200m", curiosidade: "O maior animal que já existiu na Terra, pode atingir 30 metros.", imagem: "🐋", cor: "#4A90E2" },
  { id: 25, nome: "Golfinho", tipo: "Mamífero", profundidade: "0-300m", curiosidade: "Usa ecolocalização para navegar e se comunicar.", imagem: "🐬", cor: "#00CED1" },
  { id: 26, nome: "Orca", tipo: "Mamífero", profundidade: "0-200m", curiosidade: "Na verdade é o maior golfinho, não uma baleia.", imagem: "🐋", cor: "#000000" },
  
  // Moluscos
  { id: 27, nome: "Polvo Gigante", tipo: "Molusco", profundidade: "200-2000m", curiosidade: "Possui 8 braços, 3 corações e sangue azul.", imagem: "🐙", cor: "#8B4513" },
  { id: 28, nome: "Lula Gigante", tipo: "Molusco", profundidade: "300-2000m", curiosidade: "Possui os maiores olhos do reino animal.", imagem: "🦑", cor: "#800080" },
  { id: 29, nome: "Nautilus", tipo: "Molusco", profundidade: "100-700m", curiosidade: "Fóssil vivo que existe há 500 milhões de anos.", imagem: "🐚", cor: "#DEB887" },
  
  // Crustáceos
  { id: 30, nome: "Caranguejo", tipo: "Crustáceo", profundidade: "0-4000m", curiosidade: "Caminha de lado e pode regenerar suas garras.", imagem: "🦀", cor: "#DC143C" },
  { id: 31, nome: "Lagosta", tipo: "Crustáceo", profundidade: "4-480m", curiosidade: "Pode viver mais de 100 anos e continuar crescendo.", imagem: "🦞", cor: "#B22222" },
  { id: 32, nome: "Camarão-Mantis", tipo: "Crustáceo", profundidade: "3-40m", curiosidade: "Tem o soco mais rápido do reino animal.", imagem: "🦐", cor: "#FF6347" },
  
  // Outros
  { id: 33, nome: "Tartaruga Marinha", tipo: "Réptil", profundidade: "0-1000m", curiosidade: "Navega pelos oceanos usando campos magnéticos.", imagem: "🐢", cor: "#228B22" },
  { id: 34, nome: "Água-Viva", tipo: "Cnidário", profundidade: "0-4000m", curiosidade: "Existe há 500 milhões de anos e não possui cérebro.", imagem: "🪼", cor: "#DDA0DD" },
  { id: 35, nome: "Estrela-do-Mar", tipo: "Equinodermo", profundidade: "0-6000m", curiosidade: "Pode regenerar braços perdidos e tem estômago externo.", imagem: "⭐", cor: "#FFD700" },
  { id: 36, nome: "Ouriço-do-Mar", tipo: "Equinodermo", profundidade: "0-5000m", curiosidade: "Seus espinhos são venenosos e se regeneram.", imagem: "🦔", cor: "#8B4513" }
];

// Componente de animal marinho
const AnimalMarinho = ({ animal, onClick, isSelected }) => {
  return React.createElement('div', {
    className: `animal-card ${isSelected ? 'selected' : ''}`,
    onClick: () => onClick(animal),
    style: { borderColor: animal.cor }
  },
    (animal.imagem.includes('.webp') || animal.imagem.includes('.jpg')) 
      ? React.createElement('img', { src: animal.imagem, alt: animal.nome, style: { width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' } })
      : React.createElement('div', { className: 'animal-emoji' }, animal.imagem),
    React.createElement('h3', null, animal.nome),
    React.createElement('span', { className: 'animal-tipo' }, animal.tipo)
  );
};

// Componente de detalhes do animal
const DetalhesAnimal = ({ animal, onClose }) => {
  if (!animal) return null;

  return React.createElement('div', { className: 'modal-overlay', onClick: onClose },
    React.createElement('div', { 
      className: 'modal-content',
      onClick: (e) => e.stopPropagation(),
      style: { borderColor: animal.cor }
    },
      React.createElement('button', { className: 'close-btn', onClick: onClose }, '×'),
      (animal.imagem.includes('.webp') || animal.imagem.includes('.jpg')) 
        ? React.createElement('img', { src: animal.imagem, alt: animal.nome, style: { width: '120px', height: '120px', borderRadius: '12px', objectFit: 'cover', marginBottom: '16px' } })
        : React.createElement('div', { className: 'animal-emoji-large' }, animal.imagem),
      React.createElement('h2', null, animal.nome),
      React.createElement('div', { className: 'animal-info' },
        React.createElement('p', null, React.createElement('strong', null, 'Tipo: '), animal.tipo),
        React.createElement('p', null, React.createElement('strong', null, 'Profundidade: '), animal.profundidade),
        React.createElement('p', { className: 'curiosidade' }, animal.curiosidade)
      )
    )
  );
};

// Componente de filtro
const FiltroEcossistema = ({ filtro, setFiltro }) => {
  const tipos = ['Todos', 'Peixe', 'Mamífero', 'Molusco', 'Crustáceo', 'Réptil', 'Cnidário', 'Equinodermo'];

  return React.createElement('div', { className: 'filtro-container' },
    React.createElement('h3', null, 'Filtrar por tipo:'),
    React.createElement('div', { className: 'filtro-buttons' },
      tipos.map(tipo =>
        React.createElement('button', {
          key: tipo,
          className: `filtro-btn ${filtro === tipo ? 'active' : ''}`,
          onClick: () => setFiltro(tipo)
        }, tipo)
      )
    )
  );
};

// Componente principal do ecosistema
const EcossistemaMarinho = () => {
  const [animalSelecionado, setAnimalSelecionado] = React.useState(null);
  const [filtro, setFiltro] = React.useState('Todos');

  const animaisFiltrados = filtro === 'Todos' 
    ? ecosistemaData 
    : ecosistemaData.filter(animal => animal.tipo === filtro);

  return React.createElement('div', { className: 'ecosistema-container' },
    React.createElement('header', { className: 'ecosistema-header' },
      React.createElement('h1', null, 'Ecosistema Marinho'),
      React.createElement('p', null, 'Explore a diversidade da vida marinha')
    ),

    React.createElement(FiltroEcossistema, { filtro, setFiltro }),

    React.createElement('div', { className: 'oceano-background' },
      React.createElement('div', { className: 'animais-grid' },
        animaisFiltrados.map(animal =>
          React.createElement(AnimalMarinho, {
            key: animal.id,
            animal,
            onClick: setAnimalSelecionado,
            isSelected: animalSelecionado?.id === animal.id
          })
        )
      )
    ),

    animalSelecionado && React.createElement(DetalhesAnimal, {
      animal: animalSelecionado,
      onClose: () => setAnimalSelecionado(null)
    })
  );
};

// Aplicação principal das curiosidades
const CuriosidadesApp = () => {
  return React.createElement('div', null,
    React.createElement('button', { 
      className: 'btn-voltar', 
      onClick: () => window.history.back() 
    }, 'Voltar'),
    React.createElement(EcossistemaMarinho)
  );
};