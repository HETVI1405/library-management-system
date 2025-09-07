
import React from "react";
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a855f7"];

export default function RoundChart({ books, members, issued, fines, reservations }) {
  // Data for the bar chart
  const data = [
    { name: "Books", value: books.length },
    { name: "Members", value: members.length },
    { name: "Issued", value: issued.length },
    { name: "Fines", value: fines.length },
    { name: "Reservations", value: reservations.length },
  ];

  return (
    <div style={{ marginTop: "30px"}}>
     
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
