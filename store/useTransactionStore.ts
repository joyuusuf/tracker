import { create } from "zustand";
import { Transaction } from "@/types/transaction";
import { realisticTransactions } from "@/lib/realistic-transactions";

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: realisticTransactions,
  addTransaction: (tx) =>
    set((state) => ({
      transactions: [tx, ...state.transactions],
    })),
}));
