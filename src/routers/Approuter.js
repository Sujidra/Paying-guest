import React from "react";
import { Router, Route, Switch,link, NavLink } from 'react-router-dom';
import createHistory from "history/createBrowserHistory"
import Header from "../components/Header"
import ExpenseDashboardPage from "../components/ExpenseDashboardPage"
import AddExpensePage from "../components/AddExpensePage"
import ExpenseEditPage from "../components/ExpenseEditPage"
import Register from "../components/register"
import CustomerDashboard from "../components/CustomerDashboard"
import HelpPage from "../components/HelpPage"
import RoomDetails from "../components/customerRoomDetails"
import Error from "../components/Error"
import LoginPage from "../components/Login";
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
import customerRoomDetails from "../components/customerRoomDetails";

export const history=createHistory();

const Routes= () =>{
return (
    <Router history={history}>
        <div>
                    
            <Switch>
                <PublicRoute path="/" component={Register} exact={true}/>
                <PublicRoute path="/login" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} exact={true}/>
                <PrivateRoute path="/customerdashboard" component={CustomerDashboard} exact={true}/>
                <PrivateRoute path="/customerRoomDetails" component={customerRoomDetails} exact={true}/>
                <PrivateRoute path="/create" component={AddExpensePage} />
                <PrivateRoute path="/edit/:id" component={ExpenseEditPage} />
                <PrivateRoute component={Error} />
            </Switch>
        </div>
    </Router>
)
};
export default Routes;