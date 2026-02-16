"use client";
import Image from "next/image";
import TransactionsPage from "./(dashboard)/transactions/page";
import DashboardLayout from "./(dashboard)/layout";
import SpendingChart from "@/components/dashboard/SpendingChart";

export default function Home() {
  return (
   <>
    <SpendingChart />

     <TransactionsPage />
   </>
  );
}

