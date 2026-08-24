

// const gastos=[
//   {'Descricao': 'Aluguel apartamento', 'Categoria':casa, 'Data': '12/08/2026', 'Tags':['fixo','mensal'], 'Necessário':'True', 'Valor':100.0},
//   {'Descricao': 'Supermercado Central', 'Categoria':'almentação', 'Data': '12/08/2026', 'Tags':['essencial'], 'Necessário':'True', 'Valor':10.0},
//   {'Descricao': 'Assinatura Streaming', 'Categoria':lazer, 'Data': '12/08/2026', 'Tags':['fixo','recorrente'], 'Necessário':'false', 'Valor':70.0}
//   ]
  
export default function GR_transactions_table({pagina='gastos', data}){

  return (
    <section className="all-table">
      <table>
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
            return(
              <tr key={item.id}>
                <td>{item.Descricao}</td>
                <td>{item.Categoria}</td>
                <td>{item.Data}</td>
                <td>{item.Tags}</td>
                {pagina==='gastos' && (
                  <>
                    <td>{item.Pagamento}</td>
                    <td>{item.Necessário ? 'Sim' : 'Não'}</td>
                  </>
                )}
                <td>{item.pagamento}</td>
                <td>{item.Necessário ? 'Sim' : 'Não'}</td>
                <td>{item.Valor}</td>
                <td>
                  <button>Editar</button>
                  <button>Excluir</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  );
}