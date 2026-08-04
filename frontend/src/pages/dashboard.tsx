import { useMemo, useState } from 'react'
import {
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
} from 'lucide-react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	LabelList,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import logo from '../assets/logo.png'

type Tone = 'default' | 'green' | 'red' | 'purple'

type SummaryCard = {
	title: string
	amount: string
	tone: Tone
	note?: string
	icon: typeof Wallet
}

const summaryCards: SummaryCard[] = [
	{
		title: 'SALDO TOTAL',
		amount: 'R$ 4.555,00',
		tone: 'default',
		note: '+ 12% em relacao ao mes anterior',
		icon: ArrowDownRight,
	},
	{
		title: 'RECEITAS',
		amount: 'R$ 4.555,00',
		tone: 'green',
		icon: ArrowUpRight,
	},
	{
		title: 'GASTOS',
		amount: 'R$ 4.555,00',
		tone: 'red',
		icon: PiggyBank,
	},
	{
		title: 'INVESTIMENTO DO MES',
		amount: 'R$ 4.555,00',
		tone: 'purple',
		icon: Wallet,
	},
]

const menuItems = [
	{ label: 'Inicio', icon: LayoutDashboard, active: true },
	{ label: 'Gastos', icon: TrendingDown },
	{ label: 'Receitas', icon: BadgeDollarSign },
	{ label: 'Investimentos', icon: PiggyBank },
	{ label: 'Anotacoes', icon: Notebook },
	{ label: 'Categorias', icon: Tags },
	{ label: 'Perfil', icon: User },
]

const revenueExpense = [
	{ month: 'Maio', receitas: 700, despesas: 250 },
	{ month: 'Jun', receitas: 820, despesas: 290 },
	{ month: 'Julho', receitas: 860, despesas: 270 },
]

const categories = [
	{ name: 'Alimentacao', value: 900, color: '#1fb980' },
	{ name: 'Moradia', value: 730, color: '#2f59ce' },
	{ name: 'Lazer', value: 430, color: '#f59e0b' },
	{ name: 'Transporte', value: 250, color: '#7f56d9' },
	{ name: 'Saude', value: 105, color: '#e84393' },
]

const rows = [
	{
		type: 'Aporte',
		description: 'Tesouro Direto 2029',
		category: 'Investimentos',
		date: '12/08/2005',
		tag: '#aposentadoria',
		amount: 'R$ 100,00',
		tone: 'purple',
	},
	{
		type: 'Saida',
		description: 'Supermercado Central',
		category: 'Alimentacao',
		date: '12/08/2005',
		tag: '#essencial',
		amount: '- R$ 100,00',
		tone: 'red',
	},
	{
		type: 'Aporte',
		description: 'Fundo de emergencia',
		category: 'Investimentos',
		date: '12/08/2005',
		tag: '#seguranca',
		amount: 'R$ 100,00',
		tone: 'purple',
	},
	{
		type: 'Entrada',
		description: 'Salario mensal',
		category: 'Trabalho',
		date: '12/08/2005',
		tag: '#fixo',
		amount: '+ R$ 100,00',
		tone: 'green',
	},
]

const formatCurrency = (value: number) => {
	return `R$ ${value.toLocaleString('pt-BR')}`
}

const formatCompact = (value: number) => {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		notation: 'compact',
		maximumFractionDigits: 1,
	}).format(value)
}

export default function DashboardPage() {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

	const { compareMin, compareMax, compareTicks } = useMemo(() => {
		const values = revenueExpense.flatMap((item) => [item.receitas, item.despesas])
		const minData = Math.min(...values)
		const maxData = Math.max(...values)
		const floor = Math.max(0, Math.floor(minData * 0.75 / 50) * 50)
		const ceil = Math.ceil(maxData * 1.1 / 50) * 50
		const mid = Math.round((floor + ceil) / 2)

		return {
			compareMin: floor,
			compareMax: ceil,
			compareTicks: [floor, mid, ceil],
		}
	}, [])

	const { categoryMin, categoryMax, categoryTicks } = useMemo(() => {
		const values = categories.map((item) => item.value)
		const minData = Math.min(...values)
		const maxData = Math.max(...values)
		const floor = Math.max(0, Math.floor(minData / 50) * 50)
		const ceil = Math.ceil(maxData / 50) * 50
		const safeMax = ceil === floor ? ceil + 50 : ceil

		return {
			categoryMin: floor,
			categoryMax: safeMax,
			categoryTicks: [floor, safeMax],
		}
	}, [])

	return (
		<div className={`dashboard-shell ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
			<aside className="sidebar">
				<div className="brand-row">
					<div className="brand">
						<img src={logo} alt="Logo SaldoFacil" className="brand-logo" />
						<div className="brand-name">SaldoFacil</div>
					</div>

					<button
						className="collapse-toggle"
						type="button"
						aria-label={isSidebarCollapsed ? 'Expandir menu' : 'Recolher menu'}
						onClick={() => setIsSidebarCollapsed((value) => !value)}
					>
						{isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
					</button>
				</div>

				<nav className="menu">
					{menuItems.map((item) => {
						const Icon = item.icon

						return (
							<button
								key={item.label}
								className={`menu-item ${item.active ? 'active' : ''}`}
								type="button"
								title={item.label}
							>
								<Icon size={16} strokeWidth={2} />
								<span className="menu-label">{item.label}</span>
							</button>
						)
					})}
				</nav>

				<button className="logout" type="button">
					<ArrowDownRight size={16} />
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
						</select>
						<button className="avatar" type="button" aria-label="Perfil">
							A
						</button>
					</div>
				</header>

				<section className="summary-grid" aria-label="Cards de resumo">
					{summaryCards.map((card) => {
						const Icon = card.icon

						return (
							<article key={card.title} className="card summary-card">
								<div className="summary-head">
									<p>{card.title}</p>
									<span className={`summary-icon ${card.tone}`}>
										<Icon size={15} strokeWidth={2.2} />
									</span>
								</div>

								<p className={`amount ${card.tone}`}>{card.amount}</p>
								{card.note ? <p className="note">{card.note}</p> : null}
							</article>
						)
					})}
				</section>

				<section className="charts-grid" aria-label="Graficos">
					<article className="card chart-card">
						<h2>Comparativo: Receitas vs Despesas</h2>
						<div className="chart-panel chart-height">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={revenueExpense} margin={{ left: 6, right: 8, top: 10, bottom: 2 }}>
									<CartesianGrid vertical={false} stroke="#e8eef5" />
									<YAxis
										ticks={compareTicks}
										width={74}
										domain={[compareMin, compareMax]}
										axisLine={false}
										tickLine={false}
										tickFormatter={formatCompact}
										tick={{ fontSize: 11, fill: '#607086' }}
									/>
									<XAxis
										dataKey="month"
										axisLine={false}
										tickLine={false}
										tick={{ fontSize: 12, fill: '#51607a', fontWeight: 600 }}
									/>
									<Tooltip formatter={(value) => formatCurrency(Number(value ?? 0))} />
									<Bar dataKey="receitas" fill="#1fb980" radius={[6, 6, 0, 0]} maxBarSize={46} />
									<Bar dataKey="despesas" fill="#ff3f43" radius={[6, 6, 0, 0]} maxBarSize={46} />
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
								<BarChart data={categories} layout="vertical" margin={{ left: 2, right: 12, top: 8, bottom: 6 }}>
									<CartesianGrid stroke="#eef2f7" horizontal={false} />
									<YAxis
										dataKey="name"
										type="category"
										width={100}
										axisLine={false}
										tickLine={false}
										tick={{ fontSize: 11, fill: '#4b5563', fontWeight: 600 }}
									/>
									<XAxis
										type="number"
										domain={[categoryMin, categoryMax]}
										ticks={categoryTicks}
										axisLine={false}
										tickLine={false}
										tickFormatter={(value) => value.toString()}
										tick={{ fontSize: 11, fill: '#607086' }}
									/>
									<Tooltip formatter={(value) => formatCurrency(Number(value ?? 0))} />
									<Bar dataKey="value" radius={5} maxBarSize={18}>
										{categories.map((entry) => (
											<Cell key={entry.name} fill={entry.color} />
										))}
										<LabelList dataKey="value" position="right" formatter={(value) => String(Number(value ?? 0))} />
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</div>
						<div className="category-scale">
							<span>Min: {categoryMin}</span>
							<span>Max: {categoryMax}</span>
						</div>
					</article>
				</section>

				<section className="card table-card" aria-label="Movimentacoes recentes">
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
	)
}
