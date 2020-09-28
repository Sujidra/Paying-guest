import { connect } from "react-redux"
import React from "react";
import {Route,Redirect} from "react-router-dom"


const PublicRoute = (props)=>{
    
    return(
        props.isauth?<Redirect to="/dashboard"/>:<Route {...props}/> 
    )
}

const mapStateToProps = (state)=>{
    return{isauth:state.auth.auth}
}

export default connect(mapStateToProps)(PublicRoute)
