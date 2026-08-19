import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function CategoryChart({
  data,
  categoryTicks,
  formatCurrency,
  limiteCategoria,
}) {
  return (
    <article className="card chart-card category-card shadow-cards ">
      <h2>Gastos por Categoria</h2>
      <div className="chart-panel chart-height category-height">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 2, right: 12, top: 8, bottom: 6 }}
          >
            <CartesianGrid stroke="#eef2f7" vertical={false} />
            <YAxis
              dataKey="name"
              type="category"
              width={96}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#4b5563", fontWeight: 600 }}
            />
            <XAxis
              type="number"
              domain={[0, limiteCategoria]}
              ticks={categoryTicks}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => value.toString()}
              tick={{ fontSize: 11, fill: "#607086" }}
            />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value ?? 0))}
            />
            <Bar dataKey="value" radius={6} barSize={32}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
