import { formatCurrency } from "../utils/formatCurrency";

import { SquarePen, Trash2 } from "lucide-react";


// const gastos=[
//   {'Descricao': 'Aluguel apartamento', 'Categoria':casa, 'Data': '12/08/2026', 'Tags':['fixo','mensal'], 'Necessário':'True', 'Valor':100.0},
//   {'Descricao': 'Supermercado Central', 'Categoria':'almentação', 'Data': '12/08/2026', 'Tags':['essencial'], 'Necessário':'True', 'Valor':10.0},
//   {'Descricao': 'Assinatura Streaming', 'Categoria':lazer, 'Data': '12/08/2026', 'Tags':['fixo','recorrente'], 'Necessário':'false', 'Valor':70.0}
//   ]
  
export default function GR_transactions_table({pagina='gastos', data}){

  return (
    <section className="div-table">
      <h2>Detalhamento dos Gastos</h2>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Tags</th>
            {pagina==='gastos' && (
            <>
              <th>Pagamento</th>
              <th>Necessário</th>
            </>
            )}
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) =>{
            return (
              <tr key={item.id}>
                <td className="description">{item.Descricao}</td>
                <td>
                  <span className="category">{item.Categoria}</span>
                </td>
                <td>{item.Data}</td>
                <td>
                  <div className="tags">
                    {item.Tags?.map((tag) => (
                      <span className="cor tag" key={tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </td>

                {pagina === "gastos" && (
                  <>
                    <td>
                      <span className="payment">{item.Pagamento}</span>
                    </td>
                    <td
                      className={
                        item.Necessário ? "necessary" : "not-necessary"
                      }
                    >
                      {item.Necessário ? "Sim" : "Não"}
                    </td>
                  </>
                )}
                <td className="value">{formatCurrency(item.Valor)}</td>
                <td className="actions">
                  <button>
                    <SquarePen size={20} color="#6B7C8E" />
                  </button>
                  <button>
                    <Trash2 size={20} color="#6B7C8E" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}