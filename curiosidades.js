const curiosidadesData = [
  {
    titulo: "Oceano Profundo",
    texto: "Mais de 80% dos oceanos ainda não foram explorados pelo ser humano.",
  },
  {
    titulo: "Baleia Azul",
    texto: "A baleia azul é o maior animal que já existiu, podendo atingir até 30 metros.",
  },
  {
    titulo: "Corais Vivos",
    texto: "Recifes de coral são feitos de organismos vivos e podem ser vistos do espaço.",
  },
  {
    titulo: "Peixe-Lanterna",
    texto: "Alguns peixes abissais possuem bioluminescência e criam sua própria luz.",
  }
];

function CuriosidadeCard({ titulo, texto }) {
  const [mostrarTexto, setMostrarTexto] = React.useState(false);

  return (
    <div className="card">
      <h2>{titulo}</h2>
      {mostrarTexto && <p>{texto}</p>}
      <button onClick={() => setMostrarTexto(!mostrarTexto)}>
        {mostrarTexto ? "Ocultar" : "Mostrar Mais"}
      </button>
    </div>
  );
}

function CuriosidadesApp() {
  return (
    <div className="container">
      <h1>Curiosidades Marinhas 🌊</h1>
      <div className="cards">
        {curiosidadesData.map((item, index) => (
          <CuriosidadeCard key={index} titulo={item.titulo} texto={item.texto} />
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<CuriosidadesApp />);
