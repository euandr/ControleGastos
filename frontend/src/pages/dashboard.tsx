import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeDollarSign,
  LayoutDashboard,
  Notebook,
  PiggyBank,
  Tags,
  TrendingDown,
  User,
  Wallet,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SummaryCards from "../components/SummaryCards";
import RevenueExpenseChart from "../components/RevenueExpenseChart";
import CategoryChart from "../components/CategoryChart";
import TransactionsTable from "../components/TransactionsTable";
import type {
  CategoryPoint,
  MenuItem,
  MovementRow,
  RevenueExpensePoint,
  SummaryCard,
} from "../components/types";

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

const menuItems: MenuItem[] = [
  { label: "Inicio", icon: LayoutDashboard, active: true },
  { label: "Gastos", icon: TrendingDown },
  { label: "Receitas", icon: BadgeDollarSign },
  { label: "Investimentos", icon: PiggyBank },
  { label: "Anotacoes", icon: Notebook },
  { label: "Categorias", icon: Tags },
  { label: "Perfil", icon: User },
];

const revenueExpense: RevenueExpensePoint[] = [
  { month: "Maio", receitas: 720, despesas: 190 },
  { month: "Jun", receitas: 860, despesas: 220 },
  { month: "Julho", receitas: 900, despesas: 200 },
];

const categories: CategoryPoint[] = [
  { name: "Alimentação", value: 880, color: "#1fb980" },
  { name: "moradia", value: 600, color: "#2f59ce" },
  { name: "Lazer", value: 400, color: "#f59e0b" },
  { name: "Transporte", value: 240, color: "#7f56d9" },
  { name: "Saúde", value: 120, color: "#e84393" },
];

const rows: MovementRow[] = [
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
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed((value) => !value)}
        menuItems={menuItems}
      />

      <main className="dashboard-main">
        <Topbar
          title="Ola, Armando"
          subtitle="Aqui esta o seu resumo financeiro de hoje."
        />

        <SummaryCards cards={summaryCards} />

        <section className="charts-grid" aria-label="Graficos">
          <RevenueExpenseChart
            data={revenueExpense}
            compareTicks={compareTicks}
            formatCurrency={formatCurrency}
          />
          <CategoryChart
            data={categories}
            categoryTicks={categoryTicks}
            formatCurrency={formatCurrency}
          />
        </section>

        <TransactionsTable rows={rows} />
      </main>
    </div>
  );
}
