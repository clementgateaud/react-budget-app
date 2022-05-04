import { useState } from "react";
import { Stack, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import BudgetCard from "./components/Budget/BudgetCard";
import AddBudgetModal from "./components/Budget/AddBudgetModal";
import AddExpenseModal from "./components/Expense/AddExpenseModal";
import UncategorizedBudgetCard from "./components/Budget/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/Budget/TotalBudgetCard";
import ViewExpensesModal from "./components/Expense/ViewExpensesModal";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import Button from "./components/UI/Button";

const App = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

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
                <Container className="my-4">
                  <Stack direction="horizontal" gap="2" className="mb-4">
                    <h1 className="me-auto">Budgets</h1>
                    <Button
                      variant="primary"
                      onClick={() => setShowAddBudgetModal(true)}
                    >
                      Add Budget
                    </Button>
                    <Button
                      variant="primary-outline"
                      onClick={openAddExpenseModal}
                    >
                      Add Expense
                    </Button>
                  </Stack>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(300px, 1fr))",
                      gap: "1rem",
                      alignItems: "flex-start",
                    }}
                  >
                    {budgets.map((budget) => {
                      const amount = getBudgetExpenses(budget.id).reduce(
                        (acc, curr) => {
                          return acc + curr.amount;
                        },
                        0
                      );
                      return (
                        <BudgetCard
                          key={budget.id}
                          name={budget.name}
                          amount={amount}
                          max={budget.max}
                          onAddExpenseClick={() =>
                            openAddExpenseModal(budget.id)
                          }
                          onViewExpensesClick={() =>
                            setViewExpensesModalBudgetId(budget.id)
                          }
                        />
                      );
                    })}
                    <UncategorizedBudgetCard
                      onAddExpenseClick={openAddExpenseModal}
                      onViewExpensesClick={() =>
                        setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
                      }
                    />
                    <TotalBudgetCard />
                  </div>
                </Container>
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
