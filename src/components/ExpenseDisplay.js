import React,{useState} from "react";
import {connect} from "react-redux"
import { Link } from "react-router-dom";
import numeral from "numeral";
import moment from "moment"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {starteditExpense,startremoveExpense,editExpense} from "../store/Actions/expenseAction";

import "./expenseAdd.css"
import "./Header.css"
import "./expenseFilter.css"
import { LinearProgress } from "@material-ui/core";

const ExpenseDisplay =({dispatch,id,name,amt,address}) =>{
    const [loading,setloading]=useState(false)
    return (
        
        <div className="list">
            {loading && <LinearProgress/>}
            <div className="listitem">
                <Link className="itemtitle" to ={`/edit/${id}`}> {name}</Link>
                <p style={{margin:0}}>{address}</p>
                <p style={{margin:0}}><b>Rs.{numeral(amt/100).format('Rs0.00')}</b></p>
            </div>
            <div className="amount">
                <Link to={`/edit/${id}`} class="edit" ><i class="material-icons" data-toggle="tooltip" title="Edit"><EditIcon/></i></Link>
                <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete" onClick={(e)=>{setloading(true); dispatch(startremoveExpense({id})).then(()=>{
                    setloading(false)
                })
                    }}><DeleteIcon/></i></a>
            </div>
        </div>
    )
    
}
export default connect()(ExpenseDisplay)