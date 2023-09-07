import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import ExpensesList, { loader as expensesLoader } from "./pages/ExpensesList";
import ExpenseForm, { loader as editExpenseLoader } from "./pages/ExpenseForm";
import EditExpense from "./pages/ExpenseForm";

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
