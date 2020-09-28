import React from "react";
import {connect} from "react-redux"
import { Link } from "react-router-dom";
import numeral from "numeral";
import {history} from "../routers/Approuter"
import "./expenseAdd.css"
import "./Header.css"
import "./expenseFilter.css"

const CustomerRoomDisplay =(props) =>{
    return (
        <div className="list">
            <div className="listitem">
                <Link className="itemtitle" to ={`//customerRoomDetails`}> {props.room.name}</Link>
                <p style={{marginBottom:"0.3rem"}}>{props.room.address}</p>
                <p style={{margin:0}}><b>Rs.{numeral(props.room.amt/100).format('Rs0.00')}</b></p>
            </div>
            <div className="amount">
                <button class="btn btn-primary btn-sm" onClick={(e)=>{history.push({pathname:"/customerRoomDetails",
                            state:{
                              room:props.room
                            }})}}>View</button>
            </div>
        </div>
    )
    
}
export default connect()(CustomerRoomDisplay)