import { useContext } from "react";

import { ExpensesContext } from "../store/expenses-context";
import ExpenseOutput from "../components/ExpensesOutput.js/ExpensesOutput";

export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpenseOutput expenses={expensesCtx.expenses} expensesPeriod="Total" />
  );
}
