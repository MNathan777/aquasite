// Dados do ecosistema marinho
const ecosistemaData = [
  {
    id: 1,
    nome: "Baleia Azul",
    tipo: "Mamífero",
    profundidade: "0-200m",
    curiosidade: "O maior animal que já existiu na Terra, pode atingir 30 metros e pesar 200 toneladas.",
    imagem: "🐋",
    cor: "#4A90E2"
  },
  {
    id: 2,
    nome: "Tubarão Branco",
    tipo: "Peixe",
    profundidade: "0-1200m",
    curiosidade: "Predador apex com dentes que se regeneram constantemente.",
    imagem: "🦈",
    cor: "#708090"
  },
  {
    id: 3,
    nome: "Polvo Gigante",
    tipo: "Molusco",
    profundidade: "200-2000m",
    curiosidade: "Possui 8 braços, 3 corações e sangue azul.",
    imagem: "🐙",
    cor: "#8B4513"
  },
  {
    id: 4,
    nome: "Tartaruga Marinha",
    tipo: "Réptil",
    profundidade: "0-1000m",
    curiosidade: "Pode viver mais de 100 anos e navegar pelos oceanos usando campos magnéticos.",
    imagem: "🐢",
    cor: "#228B22"
  },
  {
    id: 5,
    nome: "Golfinho",
    tipo: "Mamífero",
    profundidade: "0-300m",
    curiosidade: "Usa ecolocalização para navegar e se comunicar com outros golfinhos.",
    imagem: "🐬",
    cor: "#00CED1"
  },
  {
    id: 6,
    nome: "Peixe-Palhaço",
    tipo: "Peixe",
    profundidade: "1-15m",
    curiosidade: "Vive em simbiose com anêmonas-do-mar, sendo imune ao seu veneno.",
    imagem: "🐠",
    cor: "#FF6347"
  },
  {
    id: 7,
    nome: "Água-Viva",
    tipo: "Cnidário",
    profundidade: "0-4000m",
    curiosidade: "Existe há mais de 500 milhões de anos e não possui cérebro.",
    imagem: "🪼",
    cor: "#DDA0DD"
  },
  {
    id: 8,
    nome: "Cavalo-Marinho",
    tipo: "Peixe",
    profundidade: "0-30m",
    curiosidade: "O macho é quem engravida e dá à luz aos filhotes.",
    imagem: "🐴",
    cor: "#F0E68C"
  },
  {
    id: 9,
    nome: "Estrela-do-Mar",
    tipo: "Equinodermo",
    profundidade: "0-6000m",
    curiosidade: "Pode regenerar braços perdidos e tem estômago externo.",
    imagem: "⭐",
    cor: "#FFD700"
  },
  {
    id: 10,
    nome: "Lula Gigante",
    tipo: "Molusco",
    profundidade: "300-2000m",
    curiosidade: "Possui os maiores olhos do reino animal, do tamanho de pratos.",
    imagem: "🦑",
    cor: "#800080"
  },
  {
    id: 11,
    nome: "Peixe-Anjo",
    tipo: "Peixe",
    profundidade: "1-100m",
    curiosidade: "Muda de cor e padrão conforme cresce e muda de sexo.",
    imagem: "🐟",
    cor: "#FF69B4"
  },
  {
    id: 12,
    nome: "Caranguejo",
    tipo: "Crustáceo",
    profundidade: "0-4000m",
    curiosidade: "Caminha de lado e pode regenerar suas garras.",
    imagem: "🦀",
    cor: "#DC143C"
  }
];

// Componente de animal marinho
const AnimalMarinho = ({ animal, onClick, isSelected }) => {
  return React.createElement('div', {
    className: `animal-card ${isSelected ? 'selected' : ''}`,
    onClick: () => onClick(animal),
    style: { borderColor: animal.cor }
  },
    React.createElement('div', { className: 'animal-emoji' }, animal.imagem),
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
      React.createElement('div', { className: 'animal-emoji-large' }, animal.imagem),
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
  const tipos = ['Todos', 'Mamífero', 'Peixe', 'Molusco', 'Réptil', 'Cnidário', 'Equinodermo', 'Crustáceo'];

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
      React.createElement('h1', null, '🌊 Ecosistema Marinho 🌊'),
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
    }, '← Voltar'),
    React.createElement(EcossistemaMarinho)
  );
};