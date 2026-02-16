"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTransactionStore } from "@/store/useTransactionStore";
import { groupExpensesByCategory } from "@/lib/analytics";

const COLORS = ["#0f172a", "#22c55e", "#ef4444", "#6366f1"];

export default function SpendingChart() {
  const transactions = useTransactionStore((s) => s.transactions);
  const data = groupExpensesByCategory(transactions);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow h-64">
      <h3 className="font-semibold mb-2">Spending by Category</h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
