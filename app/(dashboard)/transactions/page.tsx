"use client";

import { useMemo, useState } from "react";
import { useTransactionStore } from "@/store/useTransactionStore";
import toast from "react-hot-toast";

export default function TransactionsPage() {
  const { transactions, deleteTransaction, updateTransaction } =
    useTransactionStore();

  // Filters & sorting
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">(
    "all"
  );
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal state
  const [editingTransaction, setEditingTransaction] = useState<any | null>(
    null
  );

  // Filtered + sorted transactions
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        if (filterType !== "all" && tx.type !== filterType) return false;

        if (search.trim()) {
          const q = search.toLowerCase();
          const matches =
            tx.title.toLowerCase().includes(q) ||
            tx.description.toLowerCase().includes(q) ||
            tx.category.toLowerCase().includes(q);
          if (!matches) return false;
        }

        if (fromDate && new Date(tx.date) < new Date(fromDate)) return false;
        if (toDate && new Date(tx.date) > new Date(toDate)) return false;

        return true;
      })
      .sort((a, b) => {
        const aTime = new Date(a.date).getTime();
        const bTime = new Date(b.date).getTime();
        return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
      });
  }, [transactions, filterType, sortOrder, search, fromDate, toDate]);

  // Group by month
  const groupedTransactions = useMemo(() => {
    const groups: Record<string, typeof filteredTransactions> = {};
    filteredTransactions.forEach((tx) => {
      const month = new Date(tx.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!groups[month]) groups[month] = [];
      groups[month].push(tx);
    });
    return groups;
  }, [filteredTransactions]);

  // Toggle bulk selection
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Bulk delete
  const handleBulkDelete = () => {
    selectedIds.forEach((id) => deleteTransaction(id));
    setSelectedIds([]);
    toast.success("Selected transactions deleted");
  };

  // Save edits
  const saveEdit = () => {
    if (!editingTransaction) return;
    updateTransaction(editingTransaction.id, editingTransaction);
    toast.success("Transaction updated");
    setEditingTransaction(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header + filters */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Transactions</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-3 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>

          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Delete Selected ({selectedIds.length})
            </button>
          )}
        </div>
      </div>

      {/* Empty state */}
      {filteredTransactions.length === 0 && (
        <p className="text-center text-gray-500 bg-white p-6 rounded-xl shadow">
          No transactions found
        </p>
      )}

      {/* Grouped transactions */}
      {Object.entries(groupedTransactions).map(([month, txs]) => (
        <div key={month} className="space-y-4">
          <h2 className="text-lg font-semibold">{month}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {txs.map((tx) => (
              <div
                key={tx.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(tx.id)}
                  onChange={() => toggleSelect(tx.id)}
                  className="mb-2"
                />

                {tx.attachmentPreview && (
                  <img
                    src={tx.attachmentPreview}
                    alt="Attachment"
                    className="h-40 w-full object-cover rounded mb-3"
                  />
                )}

                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-lg">{tx.title}</h3>
                  <p className="text-sm text-gray-500">
                    {tx.category} • {tx.date}
                  </p>
                  <p className="text-sm text-gray-600">{tx.description}</p>
                </div>

                <div
                  className={`mt-4 text-xl font-semibold ${
                    tx.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ₦{tx.amount.toLocaleString()}
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    className="flex-1 px-3 py-2 text-sm rounded border hover:bg-gray-100"
                    onClick={() => setEditingTransaction(tx)}
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
      ))}

      {/* Edit modal */}
      {editingTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4 relative">
            <h2 className="text-xl font-semibold">Edit Transaction</h2>

            <input
              type="text"
              placeholder="Title"
              className="border rounded px-3 py-2 w-full"
              value={editingTransaction.title}
              onChange={(e) =>
                setEditingTransaction({
                  ...editingTransaction,
                  title: e.target.value,
                })
              }
            />
            <input
              type="number"
              placeholder="Amount"
              className="border rounded px-3 py-2 w-full"
              value={editingTransaction.amount}
              onChange={(e) =>
                setEditingTransaction({
                  ...editingTransaction,
                  amount: Number(e.target.value),
                })
              }
            />
            <input
              type="date"
              className="border rounded px-3 py-2 w-full"
              value={editingTransaction.date}
              onChange={(e) =>
                setEditingTransaction({
                  ...editingTransaction,
                  date: e.target.value,
                })
              }
            />
            <select
              className="border rounded px-3 py-2 w-full"
              value={editingTransaction.type}
              onChange={(e) =>
                setEditingTransaction({
                  ...editingTransaction,
                  type: e.target.value,
                })
              }
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <textarea
              className="border rounded px-3 py-2 w-full"
              placeholder="Description"
              value={editingTransaction.description}
              onChange={(e) =>
                setEditingTransaction({
                  ...editingTransaction,
                  description: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setEditingTransaction(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-green-600 text-white"
                onClick={saveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
