import React from "react";
import Button from "../UI/Button";
import classes from "./BudgetCard.module.css";
import Card from "../UI/Card";
import ProgressBar from "../UI/ProgressBar";

import { currencyFormatter } from "../../utils";

const BudgetCard = (props) => {
  const {
    name,
    amount,
    max,
    uncategorized,
    total,
    onAddExpenseClick,
    hideButtons,
    onViewExpensesClick,
  } = props;

  const classNames = [];
  if (amount > max) {
    classNames.push("overbudget");
  }
  if (uncategorized) {
    classNames.push("uncategorized");
  }
  if (total) {
    classNames.push("total");
  }

  const getProgressBarVariant = (amount, max) => {
    const ratio = amount / max;
    if (ratio < 0.5) {
      return "primary";
    }
    if (ratio < 0.75) {
      return "warning";
    }
    return "danger";
  };

  return (
    <Card className={classNames.join(" ")}>
      <div className={classes["card-header"]}>
        <div className={classes["card-title"]}>{name}</div>
        <div className={classes["card-amount"]}>
          {currencyFormatter.format(amount)}
          {max && (
            <span className={classes["card-total"]}>
              &nbsp;/ {currencyFormatter.format(max)}
            </span>
          )}
        </div>
      </div>
      {max && (
        <ProgressBar
          variant={getProgressBarVariant(amount, max)}
          min={0}
          max={max}
          now={amount}
        />
      )}
      {!hideButtons && (
        <div className={classes["buttons-container"]}>
          <Button variant="primary-outline" onClick={onAddExpenseClick}>
            Add Expense
          </Button>
          <Button onClick={onViewExpensesClick} variant="secondary-outline">
            View Expenses
          </Button>
        </div>
      )}
    </Card>
  );
};

export default BudgetCard;
