"use client";

type TopbarProps = {
  onMenuClick: () => void;
};

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-14 bg-red-400 border-b flex items-center justify-between px-6 z-40">
      <div className="flex items-center gap-3">
        {/* Hamburger (mobile only) */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-700"
        >
          ☰
        </button>

        <h1 className="font-semibold text-black">Dashboard</h1>
      </div>

      <div className="text-sm text-gray-600">
        Welcome back
      </div>
    </header>
  );
}
