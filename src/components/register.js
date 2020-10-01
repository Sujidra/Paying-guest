import React from "react"
import { connect } from "react-redux";
import md5 from "md5";
import validator from "validator"
import startRegister from "../store/Actions/registerAction"
import { Link, Redirect } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import "./register.css"
import { LinearProgress } from "@material-ui/core";
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            email:"",
            password:"",
            mobile:"",
            usertype:"owner",
            hash:"",
            error:"",
            successmsg:"",
            loading:""
    }
    
    }
    handleChange = (e) => {
        const a=e.target.value;
        this.setState(()=>{
            return{usertype:a}
        })
    };
    
    onchangeUsername=(e)=>{
        const a=e.target.value;
        this.setState(()=>{
            return{username:a}
        })
    }

    onchangeMobile=(e)=>{
        const a=e.target.value;
        this.setState(()=>{
            return{mobile:a}
        })
    }

    onChangeEmail=(e)=>{
        const a=e.target.value;
        const h=md5(a);
        this.setState(()=>{
            return{
                email:a,
                hash:h
            }
        })
    }

    onChangePassword=(e)=>{
        const a=e.target.value;
        this.setState(()=>{
            return{password:a}
        })
    }
    submitform=(e)=>{
        //console.log(this.state.username)
        e.preventDefault();
        const checkEmail=validator.isEmail(this.state.email)
        const checkMobile=this.state.mobile.length===10 || this.state.mobile.length===11
        const un=this.state.username;
        const pw=this.state.password;
        const email=this.state.email;
        const mb=this.state.mobile;
        if(un && pw && email && mb)
        {
            if(checkEmail){
                if(checkMobile){
                    const formdata={
                        username:this.state.username,
                        email:this.state.email,
                        password:this.state.password,
                        hash:this.state.hash,
                        mobile:this.state.mobile,
                        userType:this.state.usertype
                    }
                    this.setState({loading:true})
                    this.props.dispatch(startRegister(formdata)).then(()=>{
                        this.setState(()=>{
                            return{error:"",loading:false}
                            
                        })
                        this.props.history.push("/");
                        
                    }).catch(()=>{
                        this.setState(()=>{
                            return{error:"Register Failed"}
                        })
                    })
                    
                    
                }else{
                    this.setState(()=>{
                        return{error:"This is not a valid mobile number"}
                    })
                }
            }else{
                this.setState(()=>{
                    return{error:"This is not a valid email"}
                })
            }
            
        }else{
            this.setState(()=>{
                return{error:"Username,password,mobile number and email should not be empty"}
            })
        }
        
        
    }

    render(){
        return(
            <div className="register">
                <div className="register_box">
                    <h1 className="title"><center>BLOG CREATER</center></h1>
                    <h2 className="signup"><center>SIGNUP</center></h2>
                    {this.state.error && <p className="loginerror">{this.state.error}</p>}
                    <form onSubmit={this.submitform} className="form">
                        <input className="input" type="email"placeholder="Email" value={this.state.email} onChange={(e)=>{this.onChangeEmail(e)}} />
                        <input className="input" type="number"placeholder="Mobile Number" value={this.state.mobile} onChange={(e)=>{this.onchangeMobile(e)}} />
                        <input className="input"type="text"placeholder="Username" value={this.state.username} onChange={(e)=>{this.onchangeUsername(e)}}/>
                        <input className="input" type="password"placeholder="Password" value={this.state.password} onChange={(e)=>{this.onChangePassword(e)}} />
                        <div style={{display:"flex"}}>
                            <Radio
                                checked={this.state.usertype === 'owner'}
                                onChange={this.handleChange}
                                value="owner"
                                name="radio-button-demo"
                                label="Male"
                                inputProps={{ 'aria-label': 'A' }}
                            />House Owner
                            <Radio
                                checked={this.state.usertype === 'customer'}
                                onChange={this.handleChange}
                                value="customer"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'B' }}
                            />Paying guest
                            
                        </div>
                        {this.state.loading && <LinearProgress/>}                      
                        <button className="regbutton" value="submit" >Register</button>
                    </form>
                    <p className="account">Already have an account? <Link className="login" to="/">Login</Link></p>
                
                </div>
            </div>
        )    
    }
}

export default connect()(Register);