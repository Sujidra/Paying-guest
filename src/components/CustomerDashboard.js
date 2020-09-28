import React from "react";
import CustomerRoomList from "./CustomerRoomList"
import "./expenseAdd.css"
import "./Header.css"
import "./expenseFilter.css"

const customerDashboardPage = () =>(
    <div class="dashboard_body">
        <CustomerRoomList />
    </div>
);
export default customerDashboardPage;