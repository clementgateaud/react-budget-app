import { Modal } from "react-bootstrap";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../../contexts/BudgetsContext";
import { currencyFormatter } from "../../utils";
import Button from "../UI/Button";
import classes from "./ViewExpensesModal.module.css";

const ViewExpensesModal = ({ budgetId, handleClose }) => {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const expenses = getBudgetExpenses(budgetId);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className={classes["modal-title"]}>
            Expenses - {budget?.name}
          </span>
          {budgetId !== UNCATEGORIZED_BUDGET_ID && (
            <Button
              onClick={() => {
                deleteBudget(budget);
                handleClose();
              }}
              variant="danger-outline"
            >
              Delete
            </Button>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {expenses.map((expense) => (
          <div className={classes["expense-row"]} key={expense.id}>
            <div className={classes["expense-left"]}>{expense.description}</div>
            <div className={classes["expense-right"]}>
              <div>{currencyFormatter.format(expense.amount)}</div>
              <Button
                onClick={() => deleteExpense(expense)}
                variant="danger-outline"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpensesModal;
