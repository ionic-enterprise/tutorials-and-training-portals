import { Layout } from "@jobsync/ui";
import { IconButton, List } from "@mui/joy";
import { AddCircle } from "@mui/icons-material";
import { useLoaderData, useNavigate } from "react-router-dom";

import { getExpenses, Expense } from "../api";
import { ExpenseCard } from "../components";

export const loader = async () => {
  /* This is where we'll get the userId from Initial Context */
  const expenses = await getExpenses();
  return { expenses };
};

const ExpensesList: React.FC = () => {
  const { expenses } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const navigate = useNavigate();

  const handleBackButton = async () => {
    /* This is where we will add Portals integration. */
  };

  return (
    <Layout>
      <Layout.Header>
        <Layout.BackButton onClick={handleBackButton} />
        <Layout.Title title="Expenses" />
        <IconButton color="primary" onClick={() => navigate("/expenses/new")}>
          <AddCircle />
        </IconButton>
      </Layout.Header>
      <Layout.Content>
        <List
          sx={{
            display: "grid",
            gap: 2,
          }}
        >
          {expenses.map((expense: Expense) => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))}
        </List>
      </Layout.Content>
    </Layout>
  );
};
export default ExpensesList;
