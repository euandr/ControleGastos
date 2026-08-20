import { formatCurrency } from "../utils/formatCurrency";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
export default function ConteinerPieChart(props) {
  const colors = ["#2563EB", "#f59e0b"];
  return (
    <section className="pie-chart-container">
      <div>
        <h2>Distribuição: Necessário vs Não necessário</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={props.data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={130}
          >
            {props.data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => {
              const total = props.data.reduce(
                (acc, item) => acc + item.value,
                0,
              );
              const porcentagem = (Number(value) / total) * 100;

              return [`${porcentagem.toFixed(1)}%`, name];
            }}
          />
          <Legend layout="horizontal" align="center" verticalAlign="bottom" />
        </PieChart>
      </div>
      <div className="legend-container">
        <div className="item-1 div">
          <p>{`Necéssário: ${formatCurrency(props.data[0].value)}`}</p>
        </div>
        <div className="item-2 div">
          <p>{`Desnecéssário: ${formatCurrency(props.data[1].value)}`}</p>
        </div>
      </div>
    </section>
  );
}
