import React,{useState} from "react";
import ExpenseForm from "./ExpenseForm";
import {connect} from "react-redux" 
import {starteditExpense,startremoveExpense,editExpense} from "../store/Actions/expenseAction";
import "./expenseAdd.css"
import "./Header.css"
import "./expenseFilter.css"
import { LinearProgress } from "@material-ui/core";

const ExpenseEditPage = (props) =>{
    
    const [loading,setloading]=useState(false)

return(
    
    <div>
        <p className="addsubhead">Edit Rooms</p>
        <ExpenseForm rooms={props.rooms} onSubmit={(room)=>{props.dispatch(starteditExpense(props.rooms.id,room))
        props.history.push("/")}}/>
        <br/>
        {loading && <LinearProgress/>}
        <button style={{marginBottom:"20px"}} className="addexpense" onClick={(e)=>{setloading(true); props.dispatch(startremoveExpense({id:props.rooms.id})).then(()=>{
            setloading(false)
            props.history.push("/")
        })
        }}>Remove Room</button>
    </div>
    )
}
const mapStateToPraops=(state,props)=>{
    return {rooms:state.rooms.find((room)=>{
        return room.id===props.match.params.id;
    })}
}
export default connect(mapStateToPraops)(ExpenseEditPage);