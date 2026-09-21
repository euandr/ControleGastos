import { useRef, useState } from "react";
import { CalendarDays, Trash2, X } from "lucide-react";


export default function NewExpenseModal({ onClose }) {
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

  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [necessario, setNecessario] = useState(null);
  const dateInputRef = useRef(null);

  const formatNumber = (value) => {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header>
          <h3>Novo Gasto</h3>
          <p>Cadastrar uma nova despesa.</p>
        </header>
        <hr />

        <main>
          <div className="descricao-modal">
            <label htmlFor="desc">DESCRIÇÃO</label>
            <input
              className="background-inputs"
              type="text"
              placeholder="EX: Salário, Projeto pessoal ..."
            />
          </div>
          <div className="valor-data-modal">
            <div>
              <label htmlFor="valor">VALOR</label>
              <div className="input-money ">
                <span>R$</span>
                <input
                  className="background-inputs"
                  type="text"
                  placeholder="0,00"
                  value={formatNumber(valor)}
                  onChange={(e) => {
                    const numeros = e.target.value.replace(/\D/g, "");
                    const novoValor = Number(numeros) / 100;
                    setValor(novoValor);
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="data">DATA</label>
              <div className="input-date">
                <input
                  ref={dateInputRef}
                  className="background-inputs"
                  id="data"
                  type="date"
                  placeholder="12/07/2026"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (dateInputRef.current) {
                      if (
                        typeof dateInputRef.current.showPicker === "function"
                      ) {
                        dateInputRef.current.showPicker();
                      } else {
                        dateInputRef.current.focus();
                      }
                    }
                  }}
                >
                  <CalendarDays size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="cat-e-pagamento-modal">
            <div>
              <label htmlFor="cat">CATEGORIA</label>
              <select className="background-inputs" id="cat">
                <option value="">mamão</option>
                <option value="comida">Comida</option>
              </select>
            </div>
            <div>
              <label htmlFor="pagamento">METÓDO DE PAGAMENTO</label>
              <select className="background-inputs" id="pagamento">
                <option value="">pix</option>
                <option value="comida">cartão</option>
              </select>
            </div>
          </div>
          <div className="necessario-modal">
            <label htmlFor="cat">NECESSÁRIO</label>
            <div className="background-inputs">
              <button
                type="button"
                onClick={() => setNecessario(true)}
                className={necessario ? "selecionado" : ""}
              >
                Sim
              </button>
              <button
                type="button"
                onClick={() => setNecessario(false)}
                className={!necessario ? "selecionado" : ""}
              >
                Não
              </button>
            </div>
          </div>
          <div className="tags-modal">
            <label htmlFor="tag">TAGS</label>
            <div className="area-tags-selecionadas">
              {tagsSelecionadas.map((tag) => (
                <div className="tag-selected">
                  <p>#{tag}</p>
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
              className="pesquisar-tag"
            />
            {mostrarTags && (
              <div className="tags-options">
                {tagsFiltradas.map((tag) => (
                  <div className="tag-option" key={tag}>
                    <span>#{tag}</span>
                    <button>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button type="button">
                  {" "}
                  Criar nova tag <span>+</span>
                </button>
              </div>
            )}
          </div>
        </main>
        <hr />
        <footer className="modal-footer">
          <button type="button" onClick={onClose} className="cancelar">
            Cancelar
          </button>
          <button
            type="button"
            className="salvar"
            onClick={onClose}
          >
            Salvar
          </button>
        </footer>
      </div>
    </div>
  );
}
