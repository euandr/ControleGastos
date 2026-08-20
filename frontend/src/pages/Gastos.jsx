import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";

import Filters from "../components/Filters";
import Header from "../components/Header";
import SummaryCads from "../components/SummaryCards";
import PieChart from "../components/ConteinerPieChart";

import { Layers, WalletMinimal, CalendarDays } from "lucide-react";

import { formatCurrency } from "../utils/formatCurrency";
import "./dashboard.css";
import "./gastos.css";

export default function Gastos() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  
    
    const data = [
      { name: "Necessário", value: 700},
      { name: "Desnecessário", value: 300 },
    ];
  return (
    <div
      className={`dashboard-shell ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}
    >
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed((value) => !value)}
      />

      <main>
        <Header
          title="Gastos"
          resumo="Gerencie todas as suas despesas."
          textButton="+ Novo Gasto"
        />
        <Filters />
        <SummaryCads
          cards={[
            {
              title: "TOTAL DE GASTOS ",
              amount: formatCurrency(55),
              tone: "default",
              // note: "+ 12% em relacao ao mes anterior",
              icon: WalletMinimal,
            },
            {
              title: "QUANTIDADE DE GASTOS",
              amount: "25 transações",
              tone: "blue",
              icon: Layers,
            },
            {
              title: "MÉDIA DIÁRIA DE GASTOS",
              amount: formatCurrency(55),
              tone: "gray",
              icon: CalendarDays,
            },
          ]}
        />
        <PieChart data={data}/>
        
      </main>
    </div>
  );
}
