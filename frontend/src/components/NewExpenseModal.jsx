import { useState } from "react";
import { CalendarDays, Trash2, X } from "lucide-react";

export default function NewExpenseModal() {
  const all_tags = ["fim de semana", "arroz", "felicidade", "comida"];
  const [tagsSelecionadas, setTagSelecionada] = useState([
    "fim de semana",
    "arroz",
    "maca",
    "peixe",
    "jantar",
    "morango",
  ]);

  const [buscaTag, setBuscaTag] = useState("");
  const [mostrarTags, setMostrarTags] = useState(false);

  const tagsFiltradas = all_tags.filter((tag) =>
    tag.toLowerCase().includes(buscaTag.toLowerCase()),
  );

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header>
          <h3>Nova Receita</h3>
          <p>Preencha os dados básicos da sua entrada financeira.</p>
        </header>
        <hr />

        <main>
          <div className="descricao-modal">
            <label htmlFor="desc">DESCRIÇÃO</label>
            <input type="text" placeholder="EX: Salário, Projeto pessoal ..." />
          </div>
          <div className="valor-data-modal">
            <div>
              <label htmlFor="valor">VALOR</label>
              <div className="input-money">
                <span>R$</span>
                <input type="text" placeholder="0,00" />
              </div>
            </div>
            <div>
              <label htmlFor="data">DATA</label>
              <div className="input-date">
                <input id="data" type="text" placeholder="12/07/2026" />
                <button type="button">
                  <CalendarDays size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="cat-modal">
            <label htmlFor="cat">CATEGORIA</label>
            <select id="cat">
              <option value="">mamão</option>
              <option value="comida">Comida</option>
            </select>
          </div>
          <div className="tags-modal">
            <label htmlFor="tag">TAGS</label>
            <div className="area-tags-selecionadas">
              {tagsSelecionadas.map((tag) => (
                <div className="tag-selected">
                  <p>{tag}</p>
                  <button>
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            <input
              id="tag"
              type="text"
              placeholder="Pesquisar tag..."
              value={buscaTag}
              onChange={(e) => setBuscaTag(e.target.value)}
              onFocus={() => setMostrarTags(true)}
              onBlur={() => setMostrarTags(false)}
            />
            {mostrarTags && (
              <div className="tags-options">
                {tagsFiltradas.map((tag) => (
                  <div className="tag-option" key={tag}>
                    <span>{tag}</span>
                    <button>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button type="button"> + Criar nova tag </button>
              </div>
            )}
          </div>
        </main>
        <hr />
        <footer className="modal-footer">
          <button className="cancelar">Cancelar</button>
          <button className="salvar">Salvar</button>
        </footer>
      </div>
    </div>
  );
}
