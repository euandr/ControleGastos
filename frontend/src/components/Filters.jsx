

export default function Filters() {
    return (
      <section className="filters">
        <div className="filter">
          <label htmlFor="month">MÊS</label>
          <select id="month">
            <option value="">Todos os meses</option>
            <option value="2026-07">Julho 2026</option>
            <option value="2026-08">Agosto 2026</option>
          </select>
        </div>

        <div className="filter">
          <label htmlFor="cat">CATEGORIA</label>
          <select id="cat">
            <option value="">Todas as categorias</option>
            <option value="comida">Comida</option>
          </select>
        </div>

        <div className="filter">
          <label htmlFor="tag">TAG</label>
          <select id="tag">
            <option value="">todas as tags</option>
            <option value="comida">Comida</option>
          </select>
        </div>

        <div className="search-filter filter">
          <label htmlFor="search">PESQUISAR POR DESCRIÇÃO</label>
          <input
            type="search"
            id="search"
            placeholder="Ex: Supermercado, Aluguel..."
          />
        </div>
      </section>
    );
}