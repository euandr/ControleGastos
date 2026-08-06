import type { MovementRow } from "./types";

type TransactionsTableProps = {
  rows: MovementRow[];
};

export default function TransactionsTable({ rows }: TransactionsTableProps) {
  return (
    <section className="card table-card" aria-label="Movimentacoes recentes">
      <h2>Movimentacoes Recentes</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Descricao</th>
              <th>Categoria</th>
              <th>Data</th>
              <th>Tags</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.description}-${row.type}`}>
                <td>
                  <span className={`pill ${row.tone}`}>{row.type}</span>
                </td>
                <td className="strong">{row.description}</td>
                <td>
                  <span className="pill neutral">{row.category}</span>
                </td>
                <td>{row.date}</td>
                <td className="tag">{row.tag}</td>
                <td className={`amount-cell ${row.tone}`}>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
