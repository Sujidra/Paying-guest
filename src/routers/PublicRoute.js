import { connect } from "react-redux"
import React from "react";
import {Route,Redirect} from "react-router-dom"


const PublicRoute = (props)=>{
    
    return(
        props.isauth? window.sessionStorage.getItem("userType")==="owner" ? <Redirect to="/dashboard"/> :<Redirect to="/customerdashboard"/>:<Route {...props}/> 
    )
}

const mapStateToProps = (state)=>{
    console.log(state.auth.userType)
    return{isauth:state.auth.auth,
        userType:state.auth.userType}
}

export default connect(mapStateToProps)(PublicRoute)
