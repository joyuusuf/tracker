import StatCard from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Balance" value="₦235,000" />
        <StatCard label="Income" value="₦250,000" />
        <StatCard label="Expenses" value="₦15,000" />
      </div>
    </div>
  );
}
