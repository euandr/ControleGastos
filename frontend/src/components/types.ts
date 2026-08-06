import type { LucideIcon } from "lucide-react";

export type Tone = "default" | "green" | "red" | "purple";

export type SummaryCard = {
  title: string;
  amount: string;
  tone: Tone;
  note?: string;
  icon: LucideIcon;
};

export type MenuItem = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

export type RevenueExpensePoint = {
  month: string;
  receitas: number;
  despesas: number;
};

export type CategoryPoint = {
  name: string;
  value: number;
  color: string;
};

export type MovementRow = {
  type: string;
  description: string;
  category: string;
  date: string;
  tag: string;
  amount: string;
  tone: Tone;
};
