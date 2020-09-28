import { connect } from "react-redux"
import React from "react";
import {Route,Redirect} from "react-router-dom"
import Header from "../components/Header"

const PrivateRoute = (props)=>{
    
    return(
        props.isauth?<div><Header /><Route {...props}/></div> :<Redirect to="/"/>
    )
}

const mapStateToProps = (state)=>{
    return{isauth:state.auth.auth}
}

export default connect(mapStateToProps)(PrivateRoute)
