export default function SummaryCards({ cards }) {
  return (
    <section className="summary-grid" aria-label="Cards de resumo">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article key={card.title} className="card summary-card">
            <div className="summary-head">
              <p>
                <strong>{card.title}</strong>
              </p>
              <span className={`summary-icon ${card.tone}`}>
                <Icon size={20} strokeWidth={2.2} />
              </span>
            </div>

            <p className={`amount ${card.tone}`}>{card.amount}</p>
            {card.title == "SALDO TOTAL" ? (
              <p className="note">{"Saldo acumulado até o mês selecionado"}</p>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}
