import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SummaryCards from "../components/SummaryCards";
import RevenueExpenseChart from "../components/RevenueExpenseChart";
import CategoryChart from "../components/CategoryChart";
import TransactionsTable from "../components/TransactionsTable";
import {
  categories,
  formatCurrency,
  menuItems,
  revenueExpense,
  rows,
  summaryCards,
} from "./data";


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

import "./dashboard.css";

import {
  MesesDisponiveis,
  buscarNome,
  buscarResumo,
} from "../services/dashboard";

export default function DashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [listMonth, setListMonth] = useState([]);
  const [mesSelecionado, setMesSelecionado] = useState("2026-07");

  const [nome, setNome] = useState("");

  const [resumo, setResumo] = useState({
    'Sdisponivel': 0,
    'totalGasto': 0,
    'totalInvestimento': 0,
    'totalReceita': 0,
  });


  const compareTicks = useMemo(
    () => Array.from({ length: 11 }, (_, index) => index * 100),
    [],
  );
  const categoryTicks = useMemo(
    () => Array.from({ length: 11 }, (_, index) => index * 100),
    [],
  );

  useEffect(() => {
    MesesDisponiveis().then((dados) => {
      setListMonth(dados);
    })

    buscarNome().then((dados) => {
      setNome(dados);
    })

  }, []);

  useEffect(() => {
    buscarResumo(mesSelecionado).then((dados) => {
      setResumo(dados);
    })
  }, [mesSelecionado]);


  // Testes AQUI    - Apague futuramente
  useEffect(() => {
    console.log(resumo);
  }, [resumo]);

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
          title={`Ola, ${nome}`}
          subtitle="Aqui esta o seu resumo financeiro de hoje."
          meses={listMonth}
          mesSelecionado={mesSelecionado}
          setMesSelecionado={setMesSelecionado}
        />

        <SummaryCards
          cards={[
            {
              title: "SALDO TOTAL",
              amount: resumo.Sdisponivel
                ? formatCurrency(resumo.Sdisponivel)
                : "R$ 0,00",
              tone: "default",
              // note: "+ 12% em relacao ao mes anterior",
              icon: Wallet,
            },
            {
              title: "RECEITAS",
              amount: resumo.totalReceita
                ? formatCurrency(resumo.totalReceita)
                : "R$ 0,00",
              tone: "green",
              icon: ArrowUpRight,
            },
            {
              title: "GASTOS",
              amount: resumo.totalGasto
                ? formatCurrency(resumo.totalGasto)
                : "R$ 0,00",
              tone: "red",
              icon: ArrowDownRight,
            },
            {
              title: "INVESTIMENTO DO MES",
              amount: resumo.totalInvestimento
                ? formatCurrency(resumo.totalInvestimento)
                : "R$ 0,00",
              tone: "purple",
              icon: PiggyBank,
            },
          ]}
        />

        <section className="charts-grid" aria-label="Gráficos">
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
