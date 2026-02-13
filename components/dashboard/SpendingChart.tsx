"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Food", value: 40000 },
  { name: "Transport", value: 20000 },
  { name: "Rent", value: 80000 },
];

const COLORS = ["#0f172a", "#22c55e", "#ef4444"];

export default function SpendingChart() {
  return (
    <div className="bg-white rounded-xl p-4 shadow h-64">
      <h3 className="font-semibold mb-2">Spending by Category</h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
