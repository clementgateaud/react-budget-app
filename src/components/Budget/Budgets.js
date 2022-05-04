import Button from "../UI/Button";
import classes from "./Budgets.module.css";
import BudgetCard from "./BudgetCard";
import TotalBudgetCard from "./TotalBudgetCard";
import UncategorizedBudgetCard from "./UncategorizedBudgetCard";
import { UNCATEGORIZED_BUDGET_ID } from "../../contexts/BudgetsContext";
import Container from "../UI/Container";
import { useBudgets } from "../../contexts/BudgetsContext";

const Budgets = (props) => {
  const { budgets, getBudgetExpenses } = useBudgets();
  return (
    <Container>
      <div className={classes["budgets-header-container"]}>
        <h1>My budgets</h1>
        <div className={classes["budgets-header-buttons"]}>
          <Button
            variant="primary"
            onClick={() => props.setShowAddBudgetModal(true)}
          >
            Add Budget
          </Button>
        </div>
      </div>
      <div className={classes["budget-cards"]}>
        {budgets.map((budget) => {
          const amount = getBudgetExpenses(budget.id).reduce((acc, curr) => {
            return acc + curr.amount;
          }, 0);
          return (
            <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              onAddExpenseClick={() => props.openAddExpenseModal(budget.id)}
              onViewExpensesClick={() =>
                props.setViewExpensesModalBudgetId(budget.id)
              }
            />
          );
        })}
        <UncategorizedBudgetCard
          onAddExpenseClick={() => props.openAddExpenseModal}
          onViewExpensesClick={() =>
            props.setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
          }
        />
      </div>
      <TotalBudgetCard />
    </Container>
  );
};

export default Budgets;
