import type { SummaryCard } from "./types";

type SummaryCardsProps = {
  cards: SummaryCard[];
};

export default function SummaryCards({ cards }: SummaryCardsProps) {
  return (
    <section className="summary-grid" aria-label="Cards de resumo">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article key={card.title} className="card summary-card">
            <div className="summary-head">
              <p>{card.title}</p>
              <span className={`summary-icon ${card.tone}`}>
                <Icon size={20} strokeWidth={2.2} />
              </span>
            </div>

            <p className={`amount ${card.tone}`}>{card.amount}</p>
            {card.note ? <p className="note">{card.note}</p> : null}
          </article>
        );
      })}
    </section>
  );
}
