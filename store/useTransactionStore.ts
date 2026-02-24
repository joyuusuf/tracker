import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Transaction = {
  description: any;
  id: string;
  title: string;
  category: string;
  type: "income" | "expense";
  amount: number;
  date: string;
  paymentMethod: "Cash" | "Card" | "Online";
  recurring: boolean;
  attachmentPreview?: string | null;
};

type TransactionStore = {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, data: Partial<Transaction>) => void;
};

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: [],

      addTransaction: (tx) =>
        set((state) => ({
          transactions: [
            {
              id: crypto.randomUUID(), // ✅ ID generated HERE
              ...tx,
            },
            ...state.transactions,
          ],
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter(
            (t) => t.id !== id
          ),
        })),

      updateTransaction: (id, data) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...data } : t
          ),
        })),
    }),
    {
      name: "transactions-storage", // localStorage key
    }
  )
);
