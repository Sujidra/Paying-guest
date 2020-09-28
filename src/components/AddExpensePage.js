import React,{useState} from "react";
import ExpenseForm from "./ExpenseForm"
import {connect} from "react-redux"
import {startaddexpense} from "../store/Actions/expenseAction"
import "./expenseAdd.css"
import "./Header.css"
import "./expenseFilter.css"

const AddExpensePage = (props) =>(
    
    <div>
        <p className="addsubhead">Add Expense</p>
        <ExpenseForm onSubmit={(expense)=>{props.dispatch(startaddexpense(expense))
        props.history.push("/")}}/>
    </div>
);

export default connect()(AddExpensePage);