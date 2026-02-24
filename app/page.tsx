// "use client";

// import { useState, useMemo } from "react";
// import { useTransactionStore } from "@/store/useTransactionStore";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
// import Sidebar from "@/components/dashboard/Sidebar";


// export default function DashboardPage() {
//   const { transactions } = useTransactionStore();

//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Totals
//   const totalIncome = useMemo(
//     () =>
//       transactions
//         .filter((t) => t.type === "income")
//         .reduce((sum, t) => sum + t.amount, 0),
//     [transactions]
//   );
//   const totalExpense = useMemo(
//     () =>
//       transactions
//         .filter((t) => t.type === "expense")
//         .reduce((sum, t) => sum + t.amount, 0),
//     [transactions]
//   );
//   const netBalance = totalIncome - totalExpense;

//   const categoryTotals = useMemo(() => {
//     const catTotals: Record<string, number> = {};
//     transactions.forEach((tx) => {
//       if (!catTotals[tx.category]) catTotals[tx.category] = 0;
//       catTotals[tx.category] += tx.amount;
//     });
//     return Object.entries(catTotals).map(([name, value]) => ({ name, value }));
//   }, [transactions]);

//   const COLORS = ["#22c55e", "#f87171", "#fbbf24", "#3b82f6", "#a855f7", "#f472b6"];

//   const recentTransactions = [...transactions]
//     .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//     .slice(0, 5);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       {/* Main content */}
//       <div className="flex-1 p-6 space-y-8">
//         <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

//         {/* Top cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="bg-green-100 rounded-xl p-6 shadow flex flex-col">
//             <span className="text-gray-500 font-medium">Total Income</span>
//             <span className="text-2xl font-semibold text-green-600">
//               ₦{totalIncome.toLocaleString()}
//             </span>
//           </div>
//           <div className="bg-red-100 rounded-xl p-6 shadow flex flex-col">
//             <span className="text-gray-500 font-medium">Total Expenses</span>
//             <span className="text-2xl font-semibold text-red-600">
//               ₦{totalExpense.toLocaleString()}
//             </span>
//           </div>
//           <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col">
//             <span className="text-gray-500 font-medium">Net Balance</span>
//             <span className="text-2xl font-semibold text-blue-600">
//               ₦{netBalance.toLocaleString()}
//             </span>
//           </div>
//         </div>

//         {/* Charts & Recent */}
//         <div className="bg-white rounded-xl shadow p-6 flex flex-col lg:flex-row gap-6">
//           <div className="flex-1">
//             <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={categoryTotals}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   fill="#8884d8"
//                   label
//                 >
//                   {categoryTotals.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(value) => value !== undefined ? `₦${value.toLocaleString()}` : ""} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="flex-1">
//             <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
//             <div className="space-y-2 max-h-64 overflow-y-auto">
//               {recentTransactions.map((tx) => (
//                 <div
//                   key={tx.id}
//                   className="flex justify-between items-center border rounded p-3 hover:bg-gray-50"
//                 >
//                   <div>
//                     <span className="font-medium">{tx.title}</span>
//                     <p className="text-sm text-gray-500">
//                       {tx.category} • {tx.date}
//                     </p>
//                   </div>
//                   <div
//                     className={`font-semibold ${
//                       tx.type === "income" ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     ₦{tx.amount.toLocaleString()}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Quick actions */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <button className="bg-green-600 text-white rounded-xl py-4 shadow hover:bg-green-700">
//             Add Income
//           </button>
//           <button className="bg-red-600 text-white rounded-xl py-4 shadow hover:bg-red-700">
//             Add Expense
//           </button>
//           <button className="bg-blue-600 text-white rounded-xl py-4 shadow hover:bg-blue-700">
//             View All Transactions
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useMemo } from "react";
import { useTransactionStore } from "@/store/useTransactionStore";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardPage() {
  const { transactions } = useTransactionStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Totals
  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const netBalance = totalIncome - totalExpense;

  const categoryTotals = useMemo(() => {
    const catTotals: Record<string, number> = {};
    transactions.forEach((tx) => {
      catTotals[tx.category] = (catTotals[tx.category] || 0) + tx.amount;
    });
    return Object.entries(catTotals).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  const COLORS = [
    "#22c55e",
    "#f87171",
    "#fbbf24",
    "#3b82f6",
    "#a855f7",
    "#f472b6",
  ];

  const recentTransactions = [...transactions]
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 5);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0
        `}
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 p-4 sm:p-6 lg:ml-64 space-y-8">
        {/* Mobile header */}
        <div className="flex items-center justify-between lg:hidden">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg"
          >
            Menu
          </button>
        </div>

        {/* Desktop title */}
        <h1 className="hidden lg:block text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        {/* Top cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-green-100 rounded-xl p-6 shadow">
            <p className="text-gray-500">Total Income</p>
            <p className="text-2xl font-semibold text-green-600">
              ₦{totalIncome.toLocaleString()}
            </p>
          </div>

          <div className="bg-red-100 rounded-xl p-6 shadow">
            <p className="text-gray-500">Total Expenses</p>
            <p className="text-2xl font-semibold text-red-600">
              ₦{totalExpense.toLocaleString()}
            </p>
          </div>

          <div className="bg-blue-100 rounded-xl p-6 shadow">
            <p className="text-gray-500">Net Balance</p>
            <p className="text-2xl font-semibold text-blue-600">
              ₦{netBalance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Chart + recent */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col lg:flex-row gap-6">
          {/* Chart */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">
              Category Breakdown
            </h2>

            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryTotals}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {categoryTotals.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) =>
                      value !== undefined
                        ? `₦${Number(value).toLocaleString()}`
                        : ""
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent transactions */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">
              Recent Transactions
            </h2>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between items-center border rounded-lg p-3 hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">{tx.title}</p>
                    <p className="text-sm text-gray-500">
                      {tx.category} • {tx.date}
                    </p>
                  </div>

                  <p
                    className={`font-semibold ${
                      tx.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ₦{tx.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <button className="w-full bg-green-600 text-white rounded-xl py-4 shadow hover:bg-green-700">
            Add Income
          </button>
          <button className="w-full bg-red-600 text-white rounded-xl py-4 shadow hover:bg-red-700">
            Add Expense
          </button>
          <button className="w-full bg-blue-600 text-white rounded-xl py-4 shadow hover:bg-blue-700">
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
}