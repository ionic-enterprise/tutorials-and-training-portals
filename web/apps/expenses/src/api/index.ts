import { v4 as uuid } from "uuid";

export enum ExpenseType {
  Travel = "Travel",
  Food = "Food",
  Misc = "Misc",
}

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  merchant: string;
  date: string;
  note: string;
  type: ExpenseType;
  receipt?: string;
}

const storageToken = "job-sync.expenses";

/* Refactor into service */
import defaultExpenses from "./expenses-data.json";
const loadExpenses = (): Expense[] => {
  const expenseData = localStorage.getItem(storageToken);
  if (!expenseData)
    localStorage.setItem(storageToken, JSON.stringify(defaultExpenses));
  return expenseData ? JSON.parse(expenseData) : defaultExpenses;
};
/* Refactor into service */

export const getExpenses = async (userId?: string): Promise<Expense[]> => {
  const expenses = loadExpenses();
  if (userId) return expenses.filter((x) => x.userId === userId);
  expenses.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  return expenses;
};

export const addExpense = async (expense: Omit<Expense, "id" | "userId">) => {
  const expenses = loadExpenses();
  expenses.push({
    ...expense,
    id: uuid(),
    userId: "ae473c77-16a7-48a7-909c-45ca02990839",
    date: new Date(expense.date).toISOString(),
  });
  localStorage.setItem(storageToken, JSON.stringify(expenses));
};

export const editExpense = async (expense: Omit<Expense, "userId">) => {
  const expenses = loadExpenses();
  const idx = expenses.findIndex((x) => x.id === expense.id);
  expenses[idx] = {
    ...expense,
    userId: "ae473c77-16a7-48a7-909c-45ca02990839",
    date: new Date(expense.date).toISOString(),
  };
  localStorage.setItem(storageToken, JSON.stringify(expenses));
};

export const getExpense = async (id: string): Promise<Expense | undefined> => {
  const expenses = loadExpenses();
  return expenses.find((x) => x.id === id);
};
