import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { AuthorizationContext } from "../../Components/Context/ContentApi";
import { useContext } from "react";

const COLORS = ["#f37633ff", "#4682B4", "#508163ff", "#FF8042", "#a855f7"];

export default function RoundChart({ books, members, issued ,users , visitorsTotal}) {
  const { admin } = useContext(AuthorizationContext);
  const isAdmin = admin === "admin123@gmail.com";

  const data = [
    { name: "Books", value: books.length },
    isAdmin ? { name: "Members", value: members.length } : { name: "Visitors", value: visitorsTotal },
    { name: "Issued", value: issued.length },
  ];

  if (!isAdmin) {
    return (
      <div style={{ marginTop: "30px" }}>
      <BarChart
        width={500}
        height={400}
        data={data}
        margin={{ top: 0, right: 10, left: 10, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </div>
    );
  }

  // Render chart
  return (
    <div style={{ marginTop: "30px" }}>
      <BarChart
        width={500}
        height={400}
        data={data}
        margin={{ top: 0, right: 10, left: 10, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}
