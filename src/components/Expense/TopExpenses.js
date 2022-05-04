import classes from "./TopExpenses.module.css";
import Container from "../UI/Container";
import Button from "../UI/Button";
import { useBudgets } from "../../contexts/BudgetsContext";
import { currencyFormatter } from "../../utils";

const TopExpenses = (props) => {
  const { expenses, getExpenseBudget } = useBudgets();
  return (
    <Container>
      <div className={classes["expenses-header-container"]}>
        <h1>My top expenses</h1>
        <div className={classes["expenses-header-buttons"]}>
          <Button variant="primary" onClick={props.openAddExpenseModal}>
            Add Expense
          </Button>
        </div>
      </div>
      <div className={classes["expenses"]}>
        {expenses
          .sort((a, b) => {
            return b.amount - a.amount;
          })
          .map((expense) => {
            const budget = getExpenseBudget(expense.id);
            return (
              <div key={expense.id} className={classes["expense"]}>
                <div className={classes["expense-body"]} key={expense.id}>
                  <p className={classes["expense-description"]}>
                    {expense.description}{" "}
                    <span className={classes["expense-budget"]}>
                      ({budget ? budget.name : "Uncategorized"})
                    </span>
                  </p>
                  <div className={classes["expense-amount"]}>
                    {currencyFormatter.format(expense.amount)}
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
      </div>
    </Container>
  );
};

export default TopExpenses;
