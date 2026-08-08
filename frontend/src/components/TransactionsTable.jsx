export default function TransactionsTable({ rows }) {
  return (
    <section className="card table-card" aria-label="Movimentacoes recentes">
      <h2>Movimentações Recentes</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>
                <strong>Tipo</strong>
              </th>
              <th>
                <strong>Descrição</strong>
              </th>
              <th>
                <strong>Categoria</strong>
              </th>
              <th>
                <strong>Data</strong>
              </th>
              <th>
                <strong>Tags</strong>
              </th>
              <th>
                <strong>Valor</strong>
              </th>
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
