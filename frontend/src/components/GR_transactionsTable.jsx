
export default function GR_transactions_table({pagina='gasto'}){
    return (
      <section className="all-table">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Data</th>
              <th>Tags</th>
              {pagina==="gastos" && (
              <>
                <th>Pagamento</th>
                <th>Necessário</th>
              </>
              )}
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </section>
    );
}