export type Transaction = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "income" | "expense";
  amount: number;
  date: string;
  paymentMethod: string;
  recurring: boolean;
  attachmentPreview?: string | null;
};
