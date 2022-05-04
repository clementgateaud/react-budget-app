import { useRef } from "react";
import { Modal } from "react-bootstrap";
import {
  useBudgets,
  UNCATEGORIZED_BUDGET_ID,
} from "../../contexts/BudgetsContext";
import classes from "../UI/Form.module.css";
import Button from "../UI/Button";

const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpense, budgets } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={classes["form-group"]} controlId="description">
            <label htmlFor="description">Description</label>
            <input ref={descriptionRef} id="description" type="text" required />
          </div>
          <div className={classes["form-group"]} controlId="amount">
            <label htmlFor="amount">Amount</label>
            <input
              ref={amountRef}
              id="amount"
              type="number"
              required
              min={0}
              step={0.01}
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="budget">Budget</label>
            <select
              defaultValue={defaultBudgetId}
              id="budget"
              ref={budgetIdRef}
            >
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </select>
          </div>
          <div className={classes["form-buttons"]}>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
};

export default AddExpenseModal;
