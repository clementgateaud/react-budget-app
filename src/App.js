import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddBudgetModal from "./components/Budget/AddBudgetModal";
import AddExpenseModal from "./components/Expense/AddExpenseModal";
import ViewExpensesModal from "./components/Expense/ViewExpensesModal";
import Budgets from "./components/Budget/Budgets";
import TopExpenses from "./components/Expense/TopExpenses";
import { useBudgets } from "./contexts/BudgetsContext";

const App = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { expenses } = useBudgets();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                <Budgets
                  setShowAddBudgetModal={setShowAddBudgetModal}
                  setViewExpensesModalBudgetId={setViewExpensesModalBudgetId}
                  openAddExpenseModal={openAddExpenseModal}
                />
                {expenses.length > 0 && <TopExpenses
                  openAddExpenseModal={openAddExpenseModal}
                />}
                <AddBudgetModal
                  show={showAddBudgetModal}
                  handleClose={() => setShowAddBudgetModal(false)}
                />
                <AddExpenseModal
                  show={showAddExpenseModal}
                  defaultBudgetId={addExpenseModalBudgetId}
                  handleClose={() => setShowAddExpenseModal(false)}
                />
                <ViewExpensesModal
                  budgetId={viewExpensesModalBudgetId}
                  handleClose={() => setViewExpensesModalBudgetId()}
                />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
