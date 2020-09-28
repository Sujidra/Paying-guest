import React from "react";
import ExpenseList from "./expenseList"
import "./expenseAdd.css"
import "./Header.css"
import "./expenseFilter.css"

const ExpenseDashboardPage = () =>(
    <div class="dashboard_body">
        <ExpenseList />
    </div>
);
export default ExpenseDashboardPage;