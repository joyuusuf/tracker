"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useTransactionStore } from "@/store/useTransactionStore";
import { nanoid } from "nanoid";

export default function AddTransactionModal() {
  const [open, setOpen] = useState(false);
  const addTransaction = useTransactionStore((s) => s.addTransaction);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    addTransaction({
      id: nanoid(),
      title: "New Transaction",
      amount: 12000,
      type: "expense",
      category: "Food",
      date: new Date().toISOString(),
    });

    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-slate-900 text-white px-4 py-2 rounded-lg"
      >
        Add Transaction
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Title" />
          <input type="number" className="w-full border rounded-lg px-3 py-2" placeholder="Amount" />

          <select className="w-full border rounded-lg px-3 py-2">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button className="w-full bg-slate-900 text-white py-2 rounded-lg">
            Save
          </button>
        </form>
      </Modal>
    </>
  );
}
