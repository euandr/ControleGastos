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
import "./dashboard.css";

import { MesesDisponiveis, buscarNome } from "../services/dashboard";

export default function DashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [listMonth, setListMonth] = useState([]);
  const [nome, setNome] = useState("");

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
    });

    buscarNome().then((dados) => {
      setNome(dados);
    })
    
  }, []);

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
        />

        <SummaryCards cards={summaryCards} />

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
