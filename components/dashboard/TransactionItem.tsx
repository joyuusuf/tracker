import { transactions } from "@/lib/mock-data";

export default function TransactionsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Transactions</h1>

      <div className="bg-white rounded-xl shadow divide-y">
        {transactions.map((tx) => (
          <div key={tx.id} className="p-4 flex justify-between">
            <div>
              <p className="font-medium">{tx.title}</p>
              <p className="text-sm text-gray-500">{tx.category}</p>
            </div>

            <p
              className={
                tx.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {tx.type === "income" ? "+" : "-"}₦{tx.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
