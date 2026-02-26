import { useContext } from "react";

import { ExpensesContext } from "../store/expenses-context";
import ExpenseOutput from "../components/ExpensesOutput.js/ExpensesOutput";
import { getDateMinusDays } from "../util/date";

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expenses) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expenses.date > date7DaysAgo;
  });

  return (
    <ExpenseOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
  );
}
