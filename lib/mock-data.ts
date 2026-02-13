import { Transaction } from "@/types/transaction";

export const transactions: Transaction[] = [
  {
    id: "1",
    title: "Salary",
    amount: 250000,
    type: "income",
    category: "Job",
    date: "2026-02-01",
  },
  {
    id: "2",
    title: "Groceries",
    amount: 15000,
    type: "expense",
    category: "Food",
    date: "2026-02-03",
  },
];
