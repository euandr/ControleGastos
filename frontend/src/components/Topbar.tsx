type TopbarProps = {
  title: string;
  subtitle: string;
};

export default function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="topbar">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-actions">
        <select aria-label="Mes">
          <option>Julho 2026</option>
          <option>Agosto 2026</option>
          <option>Setembro 2026</option>
        </select>
        <button className="avatar" type="button" aria-label="Perfil">
          A
        </button>
      </div>
    </header>
  );
}
