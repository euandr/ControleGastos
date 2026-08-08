import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function RevenueExpenseChart({
  data,
  compareTicks,
  formatCurrency,
}) {
  return (
    <article className="card chart-card">
      <h2>Comparativo: Receitas vs Despesas</h2>
      <div className="chart-comparativo chart-panel chart-height">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ left: 6, right: 8, top: 10, bottom: 2 }}
          >
            <CartesianGrid vertical={false} stroke="#e8eef5" />
            <YAxis
              ticks={compareTicks}
              width={42}
              domain={[0, 1000]}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => String(value)}
              tick={{ fontSize: 12, fill: "#7b8798" }}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#2f3747", fontWeight: 600 }}
            />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value ?? 0))}
            />
            <Bar
              dataKey="receitas"
              fill="#1fb980"
              radius={[6, 6, 0, 0]}
              barSize={48}
            />
            <Bar
              dataKey="despesas"
              fill="#ff3f43"
              radius={[6, 6, 0, 0]}
              barSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="legend legend-centered">
        <span>
          <i className="dot green" /> Receitas
        </span>
        <span>
          <i className="dot red" /> Despesas
        </span>
      </div>
    </article>
  );
}
