export default function Topbar({ title, subtitle, meses, mesSelecionado, setMesSelecionado }) {
  let nome_meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return (
    <header className="topbar">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-actions">
        <select
          aria-label="Mes"
          value={mesSelecionado}
          onChange={(e) => setMesSelecionado(e.target.value)}
        >
          {meses.map((x) => (
            <option key={x} value={x}>
              {nome_meses[parseInt(x.slice(5)) - 1]} {x.slice(0, 4)}
            </option>
          ))}
        </select>
        <button className="avatar" type="button" aria-label="Perfil">
          {title.slice(5,6).toUpperCase()}
        </button>
      </div>
    </header>
  );
}
