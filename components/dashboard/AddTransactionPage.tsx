"use client";

import { useState } from "react";
import { useTransactionStore } from "@/store/useTransactionStore";

type TransactionType = "income" | "expense";
type Category =
  | "Food"
  | "Transport"
  | "Salary"
  | "Shopping"
  | "Entertainment"
  | "Other";
type PaymentMethod = "Cash" | "Card" | "Online";

export default function AddTransactionPage() {
  const [type, setType] = useState<TransactionType>("expense");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState<Category>("Food");
  const [amount, setAmount] = useState<number | "">("");
  const [description, setDescription] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [recurring, setRecurring] = useState(false);

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

 
const addTransaction = useTransactionStore((s) => s.addTransaction);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!amount || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  addTransaction({
    type,
    title: description || `${type === "income" ? "Income" : "Expense"} - ${category}`,
    category,
    amount: Number(amount),
    date,
    description,
    paymentMethod,
    recurring,
    attachment,
    attachmentPreview: undefined
  });

  alert("Transaction saved successfully!");

  // Reset form
  setType("expense");
  setDate(new Date().toISOString().slice(0, 10));
  setCategory("Food");
  setAmount("");
  setDescription("");
  setPaymentMethod("Cash");
  setAttachment(null);
  setRecurring(false);
};

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-semibold mb-6">Add New Transaction</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Transaction Type */}
        <div className="flex items-center space-x-4">
          <label className="font-medium w-32">Type:</label>
          <select
            className="border rounded px-3 py-2 flex-1"
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Date */}
        <div className="flex items-center space-x-4">
          <label className="font-medium w-32">Date:</label>
          <input
            type="date"
            className="border rounded px-3 py-2 flex-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="flex items-center space-x-4">
          <label className="font-medium w-32">Category:</label>
          <select
            className="border rounded px-3 py-2 flex-1"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Salary</option>
            <option>Shopping</option>
            <option>Entertainment</option>
            <option>Other</option>
          </select>
        </div>

        {/* Amount */}
        <div className="flex items-center space-x-4">
          <label className="font-medium w-32">Amount:</label>
          <input
            type="number"
            min={0}
            className="border rounded px-3 py-2 flex-1"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="0.00"
          />
        </div>

        {/* Payment Method */}
        <div className="flex items-center space-x-4">
          <label className="font-medium w-32">Payment Method:</label>
          <select
            className="border rounded px-3 py-2 flex-1"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
          >
            <option>Cash</option>
            <option>Card</option>
            <option>Online</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex items-start space-x-4">
          <label className="font-medium w-32 mt-2">Description:</label>
          <textarea
            className="border rounded px-3 py-2 flex-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional notes"
          />
        </div>

        {/* Attachment */}
        <div className="flex items-center space-x-4">
          <label className="font-medium w-32">Attachment:</label>
          <input type="file" onChange={handleAttachmentChange} />
          {attachment && (
            <span className="text-sm text-gray-600">{attachment.name}</span>
          )}
        </div>

        {/* Recurring */}
        <div className="flex items-center space-x-4">
          <label className="font-medium w-32">Recurring:</label>
          <input
            type="checkbox"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
