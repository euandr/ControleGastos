import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SummaryCards from "../components/SummaryCards";
import RevenueExpenseChart from "../components/RevenueExpenseChart";
import CategoryChart from "../components/CategoryChart";
import TransactionsTable from "../components/TransactionsTable";

import {formatCurrency} from "../utils/formatCurrency";

import {
  ArrowDownRight,
  ArrowUpRight,
  PiggyBank,
  Wallet,
} from "lucide-react";

import "./dashboard.css";

import {
  MesesDisponiveis,
  buscarNome,
  buscarResumo,
  ultimosTresMeses,
  buscarGastosPorCategoria,
  buscarMovimetacoes,
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

  const [revenueExpenseData, setRevenueExpenseData] = useState([]);
  const [maiorValorGrafico, setMaiorValoGrafico] = useState(0);

  const [gastosPorCategoria, setGastosPorCategoria] =useState([]);

  const [dataMovimentacoes, setDataMovimentacoes]=useState([])


  const limiteGrafico = Math.ceil(maiorValorGrafico / 500) * 500;
  const compareTicks = useMemo(() => {
    const intervalo = limiteGrafico / 5;

    return Array.from({ length: 6 }, (_, index) => index * intervalo);
  }, [limiteGrafico]);
  // const compareTicks = useMemo(
  //   () => Array.from({ length: 11 }, (_, index) => index * 100),
  //   [],
  // );



  const maiorValorCategoria = Math.max(
    ...gastosPorCategoria.map((categoria) => categoria.value),
    0,
  );
  const limiteCategoria = Math.max(
    Math.ceil(maiorValorCategoria / 500) * 500,
    500,
  );
  const categoryTicks = useMemo(
    () =>
      Array.from({ length: 6 }, (_, index) => index * (limiteCategoria / 5)),
    [limiteCategoria],
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

    ultimosTresMeses(mesSelecionado).then(([dados, maiorValor]) => {
      setRevenueExpenseData(dados);
      setMaiorValoGrafico(maiorValor);
    });

    buscarGastosPorCategoria(mesSelecionado).then((dados) => {
      setGastosPorCategoria(dados);
    });

    buscarMovimetacoes(mesSelecionado).then((dados)=>{
      setDataMovimentacoes(dados);
    });

  }, [mesSelecionado]);


  // Testes AQUI    - Apague futuramente
  // useEffect(() => {
  //   console.log(dataMovimentacoes)
  // }, [dataMovimentacoes]);







  return (
    <div
      className={`dashboard-shell ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}
    >
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed((value) => !value)}
        
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
              amount: formatCurrency(resumo.Sdisponivel),
              tone: "default",
              // note: "+ 12% em relacao ao mes anterior",
              icon: Wallet,
            },
            {
              title: "RECEITAS",
              amount: formatCurrency(resumo.totalReceita),
              tone: "green",
              icon: ArrowUpRight,
            },
            {
              title: "GASTOS",
              amount: formatCurrency(resumo.totalGasto),
              tone: "red",
              icon: ArrowDownRight,
            },
            {
              title: "INVESTIMENTO DO MES",
              amount: formatCurrency(resumo.totalInvestimento),
              tone: "purple",
              icon: PiggyBank,
            },
          ]}
        />

        <section className="charts-grid" aria-label="Gráficos">
          <RevenueExpenseChart
            data={revenueExpenseData}
            compareTicks={compareTicks}
            formatCurrency={formatCurrency}
            limiteGrafico={limiteGrafico}
          />

          <CategoryChart
            data={gastosPorCategoria}
            categoryTicks={categoryTicks}
            formatCurrency={formatCurrency}
            limiteCategoria={limiteCategoria}
          />
        </section>

        <TransactionsTable
          rows={dataMovimentacoes}
          formatCurrency={formatCurrency}
        />
      </main>
    </div>
  );
}
