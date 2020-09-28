import React from "react";
import {connect} from "react-redux"
import { ReactReduxContext } from "react-redux";
import { NavLink } from 'react-router-dom';
import  ExpenseDisplay from "./ExpenseDisplay"
import {getVisibleExpence} from "../store/selectors/visibleExpense.js"
import {getTotalExpense} from "../store/selectors/getTotalExpense.js"
import {setText,setStartDate,setEndDate,setSortBy} from "../store/Actions/filterActions"
import {DateRangePicker } from "react-dates"
import numeral from "numeral";
import moment from "moment";

import "./expenseAdd.css" 
import "./Header.css"
import "./expenseFilter.css"


class ExpenseList extends React.Component{
    
    render(){
        //let visibility =getVisibleExpence(this.props.expenses,this.props.filter)
        //let totalexpense=getTotalExpense(visibility);
        return(
            <div>
                <div className="subhead">
                <p className="summary"></p> 
                    <NavLink className="expensebutton" to="/create" activeClassName="is-active">Add Rooms</NavLink>
        
                </div>
                <br/>
                <div className="box">
                    <div className="listheading">
                        <p>Rooms </p>
                        <p>Action</p>
                    </div>
                    <div>{this.props.rooms.map((room)=>{
                        return <ExpenseDisplay key={room.id}{...room} />})}
                    </div>
                </div>

            </div>
    
        )
    }
    
};
const mapStateToProps= (state)=>{
    return {
        rooms:state.rooms,
        
    }
}

export default connect(mapStateToProps)(ExpenseList)
