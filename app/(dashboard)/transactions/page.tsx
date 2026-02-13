"use client";

import { useTransactionStore } from "@/store/useTransactionStore";

export default function TransactionsPage() {
  const transactions = useTransactionStore((s) => s.transactions);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Transactions</h1>

      <div className="bg-white rounded-xl shadow divide-y">
        {transactions.length === 0 && (
          <p className="p-4 text-gray-500">No transactions yet</p>
        )}

        {transactions.map((tx) => (
          <div key={tx.id} className="p-4 flex justify-between">
            <div>
              <p className="font-medium">{tx.title}</p>
              <p className="text-sm text-gray-500">{tx.category}</p>
            </div>

            <p className={tx.type === "income" ? "text-green-600" : "text-red-600"}>
              ₦{tx.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
