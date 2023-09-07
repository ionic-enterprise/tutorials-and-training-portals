import {
  LoaderFunctionArgs,
  Navigate,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import App from "./App";
import ExpensesList from "./pages/ExpensesList";
import ExpenseForm from "./pages/ExpenseForm";
import EditExpense from "./pages/ExpenseForm";
import { getExpense, getExpenses } from "./api";

const expensesLoader = async () => {
  /* Edit me */
  const userId = localStorage.getItem("jobsync.userId");
  return getExpenses(userId || "");
};

const editExpenseLoader = async ({ params }: LoaderFunctionArgs) => {
  const expense = await getExpense(params.id!);
  if (!expense) return redirect("/expenses/new");
  return expense;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/expenses" replace={true} />,
      },
      {
        path: "*",
        element: <Navigate to="/expenses" replace={true} />,
      },
      {
        path: "expenses",
        element: <ExpensesList />,
        loader: expensesLoader,
      },
      {
        path: "expenses/:id",
        element: <EditExpense />,
        loader: editExpenseLoader,
      },
      {
        path: "expenses/new",
        element: <ExpenseForm />,
      },
    ],
  },
]);

export default router;
