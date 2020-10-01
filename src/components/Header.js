import React from "react";
import { Link } from 'react-router-dom';
import {Logout} from "../store/Actions/LogoutActions"
import {connect} from "react-redux"
import {history} from "../routers/Approuter"
import "./expenseAdd.css"
import "./Header.css"
import "./expenseFilter.css"

const Header = (props) =>(
    <div className="header">
        {window.sessionStorage.getItem("userType") === "owner"? 
        <Link class="headtitle" to="/dashboard">Guest Room Booking</Link>
        :
        <Link class="headtitle" to="/customerdashboard">Guest Room Booking</Link>
        }
        <button className="logout" onClick={(e)=>{
            localStorage.setItem("id","");
            localStorage.setItem("userType","");
            window.sessionStorage.setItem("id","")
            window.sessionStorage.setItem("userType","");
            props.dispatch(Logout())
            history.push("/")
            
        }}>Logout</button>
    </div>
    
);
const mapStateToProps = (state)=>{
    console.log(state.auth.userType)
    return{isauth:state.auth.auth,
        userType:state.auth.userType}
}


export default connect(mapStateToProps)(Header);