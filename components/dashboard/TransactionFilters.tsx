"use client";

export default function TransactionFilters() {
  return (
    <div className="flex flex-wrap gap-3">
      <input type="date" className="border rounded-lg px-3 py-2" />
      <select className="border rounded-lg px-3 py-2">
        <option>All categories</option>
        <option>Food</option>
        <option>Job</option>
      </select>
    </div>
  );
}
