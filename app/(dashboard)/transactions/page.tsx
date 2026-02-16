"use client";

import { useState } from "react";
import { useTransactionStore } from "@/store/useTransactionStore";

export default function TransactionsPage() {
  const { transactions, deleteTransaction } = useTransactionStore();

  const [filterType, setFilterType] = useState<"all" | "income" | "expense">(
    "all"
  );
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const filteredTransactions = transactions
    .filter((tx) =>
      filterType === "all" ? true : tx.type === filterType
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Transactions</h1>

        {/* Filters */}
        <div className="flex gap-3">
          <select
            className="border rounded px-3 py-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            className="border rounded px-3 py-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Empty state */}
      {filteredTransactions.length === 0 && (
        <p className="text-center text-gray-500 bg-white p-6 rounded-xl shadow">
          No transactions found
        </p>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTransactions.map((tx) => (
          <div
            key={tx.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
          >
            {/* Image */}
            {tx.attachmentPreview && (
              <img
                src={tx.attachmentPreview}
                alt="Attachment"
                className="h-40 w-full object-cover rounded mb-3"
              />
            )}

            {/* Details */}
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{tx.title}</h3>
              <p className="text-sm text-gray-500">{tx.category}</p>
              <p className="text-sm text-gray-500">{tx.date}</p>
              {tx.description && (
                <p className="text-sm text-gray-600">{tx.description}</p>
              )}
            </div>

            {/* Amount */}
            <div
              className={`mt-4 text-xl font-semibold ${
                tx.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ₦{tx.amount.toLocaleString()}
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-between gap-3">
              <button
                className="flex-1 px-3 py-2 text-sm rounded border hover:bg-gray-100"
                onClick={() =>
                  alert("Editing can route to /add-transaction?id=" + tx.id)
                }
              >
                Edit
              </button>

              <button
                className="flex-1 px-3 py-2 text-sm rounded bg-red-500 text-white hover:bg-red-600"
                onClick={() => deleteTransaction(tx.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
