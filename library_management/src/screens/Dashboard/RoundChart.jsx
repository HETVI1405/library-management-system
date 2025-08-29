import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a855f7"];

export default function RoundChart({ books, members, issued, fines, reservations }) {
  // Data for the pie chart
  const data = [
    { name: "Books", value: books.length },
    { name: "Members", value: members.length },
    { name: "Issued", value: issued.length },
    { name: "Fines", value: fines.length },
    { name: "Reservations", value: reservations.length },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
      <PieChart width={250} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
