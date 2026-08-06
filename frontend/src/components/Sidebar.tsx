import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import logo from "../../assets/logo.png";

export type MenuItem = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

type SidebarProps = {
  isCollapsed: boolean;
  onToggle: () => void;
  menuItems: MenuItem[];
};

export default function Sidebar({
  isCollapsed,
  onToggle,
  menuItems,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand-row">
        <div className="brand">
          <img src={logo} alt="Logo SaldoFacil" className="brand-logo" />
          <div className="brand-name">SaldoFacil</div>
        </div>

        <button
          className="collapse-toggle"
          type="button"
          aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
          onClick={onToggle}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
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
  );
}
