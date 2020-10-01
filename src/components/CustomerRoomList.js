import React from "react";
import {connect} from "react-redux"
import { ReactReduxContext } from "react-redux";
import { NavLink } from 'react-router-dom';
import  ExpenseDisplay from "./ExpenseDisplay"
import CustomerRoomDisplay from "./CustomerRoomDisplay"
import {getVisibleExpence} from "../store/selectors/visibleExpense.js"
import {getTotalExpense} from "../store/selectors/getTotalExpense.js"
import {setText,setStartDate,setEndDate,setSortBy} from "../store/Actions/filterActions"
import {DateRangePicker } from "react-dates"
import numeral from "numeral";
import "./expenseAdd.css"
import "./Header.css"
import "./expenseFilter.css"
import { LinearProgress } from "@material-ui/core";


class CustomerRoomList extends React.Component{
state={
   calenderFocused:null
}
onDatechange=({startDate,endDate})=>{
this.props.dispatch(setStartDate({startDate}))
this.props.dispatch(setEndDate({endDate}))
}
onfocusChange=(focusedInput)=>{
    this.setState(()=>({calenderFocused:focusedInput}))
}
    
    render(){
        return(
            <div>
                <p className="addsubhead">View Rooms</p>
                {(this.props.rooms.length===0) ? <LinearProgress/> :
                    <div className="box">
                        <div className="listheading">
                            <p>Rooms </p>
                            <p>Action</p>
                        </div>
                        <div>{this.props.rooms.map((room)=>{
                            return <CustomerRoomDisplay key={room.id} room={room}  />})}
                        </div>
                    </div>
                }
            </div>
    
        )
    }
    
};
const mapStateToProps= (state)=>{
    return {
        rooms:state.customerRooms,
        
    }
}

export default connect(mapStateToProps)(CustomerRoomList)
