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

import { buscarResumoMensal } from "../services/dashboard";

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

  useEffect(() => {
    buscarResumoMensal("2026-07").then((dados) => {
      console.log(dados);
    });
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
          title="Ola, Armando"
          subtitle="Aqui esta o seu resumo financeiro de hoje."
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
