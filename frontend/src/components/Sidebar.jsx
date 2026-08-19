import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import {
  BadgeDollarSign,
  LayoutDashboard,
  Notebook,
  PiggyBank,
  Tags,
  TrendingDown,
  User,
} from "lucide-react";

export default function Sidebar({ isCollapsed, onToggle}) {

  const menuItems = [
    { label: "Inicio", icon: LayoutDashboard, path: "/" },
    { label: "Gastos", icon: TrendingDown, path: "/gastos" },
    { label: "Receitas", icon: BadgeDollarSign, path: "/receitas" },
    { label: "Investimentos", icon: PiggyBank, path: "/investimentos" },
    { label: "Anotacoes", icon: Notebook, path: "/anotacoes" },
    { label: "Categorias", icon: Tags, path: "/categorias" },
    { label: "Perfil", icon: User, path: "/perfil" },
  ];
  return (
    <aside className="sidebar">
      <div className="brand-row">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <img src={logo} alt="Logo SaldoFácil" className="brand-logo" />
          </div>
          <div className="brand-copy">
            <div className="brand-name">SaldoFácil</div>
          </div>
        </div>

        <button
          className="collapse-toggle"
          type="button"
          aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
          onClick={onToggle}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={19} />}
        </button>
      </div>

      <div className="sidebar-divider brand-divider" aria-hidden="true" />

      <nav className="menu">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
              title={item.label}
            >
              <Icon size={18} strokeWidth={2} className="menu-icon" />
              <span className="menu-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-divider logout-divider" aria-hidden="true" />
      <button className="logout sair-button" type="button">
        <LogOut size={18} />
        <span className="menu-label">Sair</span>
      </button>
    </aside>
  );
}
