import { create } from "zustand";
import { nanoid } from "nanoid";

export type TransactionType = "income" | "expense";

export interface Transaction {
  attachmentPreview: any;
  id: string;
  type: TransactionType;
  title: string;
  category: string;
  amount: number;
  date: string;
  description?: string;
  paymentMethod?: string;
  recurring?: boolean;
  attachment?: File | null;
}

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  addTransaction: (tx) =>
    set((state) => ({
      transactions: [...state.transactions, { id: nanoid(), ...tx }],
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((tx) => tx.id !== id),
    })),
}));