
import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";

import "./gastos.css";

export default function Gastos(){
const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    return (
      <div
        className={`dashboard-shell ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}
      >
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed((value) => !value)}
        />

        <main>
          <header>
            <div>
              <h1>Receitas</h1>
              <p>Gerencie todas as suas entradas finaceiras.</p>
            </div>
            <button>+ Nova Receita</button>
          </header>
        </main>
      </div>
    );
}