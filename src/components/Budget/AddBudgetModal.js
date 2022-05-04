import { useRef } from "react";
import { Modal } from "react-bootstrap";
import { useBudgets } from "../../contexts/BudgetsContext";
import Button from "../UI/Button";
import classes from "../UI/Form.module.css";

const AddBudgetModal = ({ show, handleClose }) => {
  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudgets();

  const handleSubmit = (e) => {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={classes["form-group"]}>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" required ref={nameRef} />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="max">Maximum Spending</label>
            <input
              type="number"
              id="max"
              required
              min={0}
              step={0.01}
              ref={maxRef}
            />
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

export default AddBudgetModal;
