"use client";

import { useState } from "react";
import toast from "react-hot-toast";
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
  const addTransaction = useTransactionStore((s) => s.addTransaction);

  const [type, setType] = useState<TransactionType>("expense");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState<Category>("Food");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("Cash");
  const [attachmentPreview, setAttachmentPreview] =
    useState<string | null>(null);
  const [recurring, setRecurring] = useState(false);

  // Image → Base64 + toast
  const handleAttachmentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setAttachmentPreview(reader.result as string);
      toast.success("Attachment added successfully");
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0 || !description.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

     addTransaction({
      title: description,
      description, 
      category,
      type,
      amount: Number(amount),
      date,
      paymentMethod,
      recurring,
      attachmentPreview,
    });

    toast.success("Transaction saved successfully");

    // Reset form
    setType("expense");
    setDate(new Date().toISOString().slice(0, 10));
    setCategory("Food");
    setAmount("");
    setDescription("");
    setPaymentMethod("Cash");
    setAttachmentPreview(null);
    setRecurring(false);
  };

  const handleCancel = () => {
    toast("Transaction cancelled", {
      icon: "⚠️",
    });

    window.history.back();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-6">
      <h1 className="text-2xl font-semibold mb-6">
        Add New Transaction
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Type */}
        <div className="flex gap-4 items-center">
          <label className="w-32 font-medium">Type</label>
          <select
            className="border rounded px-3 py-2 flex-1"
            value={type}
            onChange={(e) =>
              setType(e.target.value as TransactionType)
            }
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Date */}
        <div className="flex gap-4 items-center">
          <label className="w-32 font-medium">Date</label>
          <input
            type="date"
            className="border rounded px-3 py-2 flex-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="flex gap-4 items-center">
          <label className="w-32 font-medium">Category</label>
          <select
            className="border rounded px-3 py-2 flex-1"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as Category)
            }
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
        <div className="flex gap-4 items-center">
          <label className="w-32 font-medium">Amount</label>
          <input
            type="number"
            min={0}
            className="border rounded px-3 py-2 flex-1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </div>

        {/* Payment */}
        <div className="flex gap-4 items-center">
          <label className="w-32 font-medium">Payment</label>
          <select
            className="border rounded px-3 py-2 flex-1"
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value as PaymentMethod)
            }
          >
            <option>Cash</option>
            <option>Card</option>
            <option>Online</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex gap-4">
          <label className="w-32 font-medium mt-2">
            Description
          </label>
          <textarea
            className="border rounded px-3 py-2 flex-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Attachment */}
        <div className="flex gap-4 items-center">
          <label className="w-32 font-medium">Attachment</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAttachmentChange}
          />
        </div>

        {/* Preview */}
        {attachmentPreview && (
          <div className="ml-32">
            <img
              src={attachmentPreview}
              alt="Preview"
              className="h-32 rounded border"
            />
          </div>
        )}

        {/* Recurring */}
        <div className="flex gap-4 items-center">
          <label className="w-32 font-medium">Recurring</label>
          <input
            type="checkbox"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-200"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
