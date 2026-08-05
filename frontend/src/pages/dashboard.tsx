import { useMemo, useState } from "react";
import {
  LogOut,
  ArrowDownRight,
  ArrowUpRight,
  BadgeDollarSign,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Notebook,
  PiggyBank,
  Tags,
  TrendingDown,
  User,
  Wallet,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import logo from "../assets/logo.png";

type Tone = "default" | "green" | "red" | "purple";

type SummaryCard = {
  title: string;
  amount: string;
  tone: Tone;
  note?: string;
  icon: typeof Wallet;
};

const summaryCards: SummaryCard[] = [
  {
    title: "SALDO TOTAL",
    amount: "R$ 4.555,00",
    tone: "default",
    note: "+ 12% em relacao ao mes anterior",
    icon: ArrowDownRight,
  },
  {
    title: "RECEITAS",
    amount: "R$ 4.555,00",
    tone: "green",
    icon: ArrowUpRight,
  },
  {
    title: "GASTOS",
    amount: "R$ 4.555,00",
    tone: "red",
    icon: PiggyBank,
  },
  {
    title: "INVESTIMENTO DO MES",
    amount: "R$ 4.555,00",
    tone: "purple",
    icon: Wallet,
  },
];

const menuItems = [
  { label: "Inicio", icon: LayoutDashboard, active: true },
  { label: "Gastos", icon: TrendingDown },
  { label: "Receitas", icon: BadgeDollarSign },
  { label: "Investimentos", icon: PiggyBank },
  { label: "Anotacoes", icon: Notebook },
  { label: "Categorias", icon: Tags },
  { label: "Perfil", icon: User },
];

const revenueExpense = [
  { month: "Maio", receitas: 720, despesas: 190 },
  { month: "Jun", receitas: 860, despesas: 220 },
  { month: "Julho", receitas: 900, despesas: 200 },
];

const categories = [
  { name: "Alimentação", value: 880, color: "#1fb980" },
  { name: "moradia", value: 600, color: "#2f59ce" },
  { name: "Lazer", value: 400, color: "#f59e0b" },
  { name: "Transporte", value: 240, color: "#7f56d9" },
  { name: "Saúde", value: 120, color: "#e84393" },
];

const rows = [
  {
    type: "Aporte",
    description: "Tesouro Direto 2029",
    category: "Investimentos",
    date: "12/08/2005",
    tag: "#aposentadoria",
    amount: "R$ 100,00",
    tone: "purple",
  },
  {
    type: "Saida",
    description: "Supermercado Central",
    category: "Alimentacao",
    date: "12/08/2005",
    tag: "#essencial",
    amount: "- R$ 100,00",
    tone: "red",
  },
  {
    type: "Aporte",
    description: "Fundo de emergencia",
    category: "Investimentos",
    date: "12/08/2005",
    tag: "#seguranca",
    amount: "R$ 100,00",
    tone: "purple",
  },
  {
    type: "Entrada",
    description: "Salario mensal",
    category: "Trabalho",
    date: "12/08/2005",
    tag: "#fixo",
    amount: "+ R$ 100,00",
    tone: "green",
  },
];

const formatCurrency = (value: number) => {
  return `R$ ${value.toLocaleString("pt-BR")}`;
};

export default function DashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const compareTicks = useMemo(
    () => Array.from({ length: 11 }, (_, index) => index * 100),
    [],
  );

  const categoryTicks = useMemo(
    () => Array.from({ length: 11 }, (_, index) => index * 100),
    [],
  );

  return (
    <div
      className={`dashboard-shell ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}
    >
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand">
            <img src={logo} alt="Logo SaldoFacil" className="brand-logo" />
            <div className="brand-name">SaldoFacil</div>
          </div>

          <button
            className="collapse-toggle"
            type="button"
            aria-label={isSidebarCollapsed ? "Expandir menu" : "Recolher menu"}
            onClick={() => setIsSidebarCollapsed((value) => !value)}
          >
            {isSidebarCollapsed ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>
        </div>

        <nav className="menu">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`menu-item ${item.active ? "active" : ""}`}
                type="button"
                title={item.label}
              >
                <Icon size={18} strokeWidth={2} />
                <span className="menu-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button className="logout" type="button">
          <LogOut size={18} />
          <span className="menu-label">Sair</span>
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <div>
            <h1>Ola, Armando</h1>
            <p>Aqui esta o seu resumo financeiro de hoje.</p>
          </div>

          <div className="topbar-actions">
            <select aria-label="Mes">
              <option>Julho 2026</option>
              <option>Agosto 2026</option>
              <option>Setembro 2026</option>
            </select>
            <button className="avatar" type="button" aria-label="Perfil">
              A
            </button>
          </div>
        </header>

        <section className="summary-grid" aria-label="Cards de resumo">
          {summaryCards.map((card) => {
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

        <section className="charts-grid" aria-label="Graficos">
          <article className="card chart-card">
            <h2>Comparativo: Receitas vs Despesas</h2>
            <div className="chart-comparativo chart-panel chart-height">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueExpense}
                  margin={{ left: 6, right: 8, top: 10, bottom: 2 }}
                >
                  <CartesianGrid vertical={false} stroke="#e8eef5" />
                  <YAxis
                    ticks={compareTicks}
                    width={42}
                    domain={[0, 1000]}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => String(value)}
                    tick={{ fontSize: 12, fill: "#7b8798" }}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#2f3747", fontWeight: 600 }}
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value ?? 0))}
                  />
                  <Bar
                    dataKey="receitas"
                    fill="#1fb980"
                    radius={[6, 6, 0, 0]}
                    barSize={48}
                  />
                  <Bar
                    dataKey="despesas"
                    fill="#ff3f43"
                    radius={[6, 6, 0, 0]}
                    barSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="legend">
              <span>
                <i className="dot green" /> Receitas
              </span>
              <span>
                <i className="dot red" /> Despesas
              </span>
            </div>
          </article>

          <article className="card chart-card category-card">
            <h2>Gastos por Categoria</h2>
            <div className="chart-panel chart-height category-height">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categories}
                  layout="vertical"
                  margin={{ left: 2, right: 12, top: 8, bottom: 6 }}
                >
                  <CartesianGrid stroke="#eef2f7" horizontal={false} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={112}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#4b5563", fontWeight: 600 }}
                  />
                  <XAxis
                    type="number"
                    domain={[0, 1000]}
                    ticks={categoryTicks}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => value.toString()}
                    tick={{ fontSize: 11, fill: "#607086" }}
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value ?? 0))}
                  />
                  <Bar dataKey="value" radius={6} barSize={32}>
                    {categories.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>

        <section
          className="card table-card"
          aria-label="Movimentacoes recentes"
        >
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
      </main>
    </div>
  );
}
