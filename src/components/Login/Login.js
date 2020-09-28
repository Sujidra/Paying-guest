
import React, { useState } from 'react';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/logo199.svg'
import Background from '../../assets/login_image.jpeg';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import TransformIcon from '@material-ui/icons/Transform';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import LinearProgress from '@material-ui/core/LinearProgress';
// import validator from 'validator';
import $ from 'jquery';
import {startLogin} from "../../store/Actions/loginAction"
import { baseurl } from '../../config';


import "../Login/Login.css"
import { connect } from 'react-redux';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Pay Pointz
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width:"100%",
    display:"flex",
    justifyContent:"space-around",
    height:"100%",
    paddingTop:"15px"
    //alignItems:"center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signinlogo:{marginTop:15,marginBottom:15,width:'30%',height:'30%',},
  options:{
    // alignItems: 'flexend',
    display:"flex",
    flexDirection:"column",
    width:"20%",
    alignItems:"center"
  },
}));

function SignInSide(props) {
  const classes = useStyles();

  const[username,changeusername]=useState("")
  const [password,changepassword]=useState("")
  const [Phnum,changePhnum]=useState("")
  const [PhnumError,changePhnumError]=useState("")
  const[err,changeerr]=useState(false)
  const[isLoading,loadingChange]=useState(false)

  const onSubmitFunc=(e)=>{
    e.preventDefault();
    loadingChange(true);
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({ username:username, password:password}),
      redirect: 'follow'
    };
    
    fetch(baseurl+"/auth/login/reseller", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        console.log(result.api_key)
        console.log('result')
        if(result.status===200) {
          let ids=[]
          let names=[]
          result.services.map((service,i)=>{
            console.log(service.name)
            // ids.push(service.service_id);
            names.push(service.name);
            // service_names.push(service.service_name);
          })
          // defaultservices.forEach((service) => {
          //   ids.push(service.service_id);
          //   names.push(service.service_name);
          // });
          
          localStorage.setItem('api_key', result.api_key);
          localStorage.setItem('user_type', result.user_info.user_type);
          window.sessionStorage.setItem("api_key", result.api_key);
          window.sessionStorage.setItem("user_type", result.user_info.user_type);
          window.sessionStorage.setItem("allowedService_ids", ids);
          window.sessionStorage.setItem("allowedService_names", names);
          
          loadingChange(false);
          props.dispatch(startLogin(result.api_key,result.user_info.user_type,names))
          if(result.user_info.user_type==="reseller")
          {
            props.history.push("/dashboard")
          }else{
            props.history.push("/");
            changeusername("");
            changepassword("")
          }
        }
        else {
          loadingChange(false);
          changeerr(true);
          changeusername("");
          changepassword("");
        }
        window.sessionStorage.getItem('api_key');
      })
      .catch(error => console.log('error', error));
  }

  $(document).ready(function(){
    $("#phoneSubmit").click(function(){
      if (Phnum.length === 10) {
        changePhnumError("");
        $("#close").click();
        $('#otpModalLink').click( );
      }else  {
        changePhnumError("* Invalid Mobile Number")
      }

      
    });
    
  });
  

  /*const handdleEmail = () => {
    if (!validator.isEmail(email)) {
      changeEmailError("Please enter valid Email")
    }
    else{
      changeEmailError("");
      //document.getElementById("VerifyModal").hideModal();;
      document.getElementById('otpModal').showModal();

    }
  };
  */

  const myFunction=()=>{
    let x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} style={{alignItems:'flex-end',}}>
        <div style={{width:'80%',display:'flex',justifyContent:'space-evenly'}}>
          <div className={classes.options} >
            <button type="button" style={{color:'#fff',backgroundColor:'#1de9b6',borderColor:'#1de9b6'}} class="btn  btn-circle btn-xl" disabled ><MonetizationOnOutlinedIcon style={{marginTop:6}} fontSize="large"/></button> 
            <p style={{textAlign:"center",color:'#4db6ac'}}>Recharge and Bill Payment</p>
          </div>
          <div className={classes.options} >
            <button type="button" style={{color:'#fff',backgroundColor:'#f48fb1',borderColor:'#f48fb1'}} class="btn  btn-circle btn-xl" disabled ><TransformIcon style={{marginTop:6}} fontSize="large"/></button> 
            <p style={{color:'#f48fb1'}}>Money Transfer</p>
          </div>
          <div className={classes.options} >
            <button type="button" style={{color:'#fff',backgroundColor:'#ce93d8',borderColor:'#ce93d8'}} class="btn  btn-circle btn-xl" disabled ><FlightTakeoffIcon style={{marginTop:6}} fontSize="large"/></button> 
            <p style={{color:'#ce93d8'}}>Travel Booking</p>
          </div>
          <div className={classes.options} >
            <button type="button" style={{color:'#fff',backgroundColor:'#4fc3f7',borderColor:'#4fc3f7'}} class="btn  btn-circle btn-xl" disabled ><CardGiftcardIcon style={{marginTop:6}} fontSize="large"/></button> 
            <p style={{color:'#4fc3f7'}}>Many More</p>
          </div>
        </div>
        
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      {
        (isLoading) && <LinearProgress />
      }

        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}
          <img className={classes.signinlogo} alt="img" src={logo}></img>
          <form className={classes.form} noValidate>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Mobile Number"
              name="mobile_num"
              autoComplete="mobile_number"
              value={username}
              onChange={(e)=>{changeusername(e.target.value)}}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e)=>{changepassword(e.target.value)}}
              autoComplete="current-password"
            />
            {(err) ? <p className="error" style={{color:"red"}}>* Invalid username or password</p> : <br></br> } 

            {(!isLoading) ?
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e)=>{onSubmitFunc(e)}}
            >
              Sign In
            </Button>
            :
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          }
            <Grid container>
              <Grid item xs>
                <Link href="#VerifyModal" data-toggle="modal" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      <div id="VerifyModal" class="modal fade">
        <div class="modal-dialog" style={{maxWidth:"450px"}}>
          <div class="modal-content">
            <form>
              <div class="modal-header">						
                {/*<h4 class="modal-title">Verify Email</h4>*/}
                <Typography component="h4" variant="h6" style={{color:"#3f51b5"}} class="modal-title" gutterBottom>
                    Verify Mobile Number
                </Typography>
                
                <button type="button" id="close" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div class="modal-body">					
                <div class="form-group">
                  
                  <label>Enter Mobile Number</label>
                  <input type="tel" class="form-control" value={Phnum} onChange={(e)=>{changePhnum(e.target.value)}} required/>
                  {(PhnumError) && <p className="error" style={{marginTop:"5px" ,color:"red"}}>{PhnumError}</p>}

                </div>
              </div>
              <div class="modal-footer" style={{display:"flex",justifyContent:"center"}}>
                <input type="button" class="btn btn-primary" id="phoneSubmit" value="Submit" /*onClick={(e)=>{handdleEmail(e)}}*//>
                <button type="button"  style={{display:"none"}} data-toggle="modal" data-target="#otpModal" id="otpModalLink" ></button>
              </div>
            </form>
            {/*
              (!emailError)&& 
                <div>
                  {console.log("hii")}
                  <Link href="#VerifyModal" data-dismiss="modal" variant="body2"></Link>
                  <Link href="#otpModal" data-toggle="modal" variant="body2"></Link>
                </div>
            */}
          </div>
        </div>
      </div>
      <div id="otpModal" class="modal fade">
        <div class="modal-dialog" style={{maxWidth:"450px"}}>
          <div class="modal-content">
            <form>
              <div class="modal-header">						
                {/*<h4 class="modal-title">Verify Email</h4>*/}
                <Typography component="h4" variant="h6" style={{color:"#3f51b5"}} class="modal-title" gutterBottom>
                    Verify OTP
                </Typography>
                
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div class="modal-body">					
                <div class="form-group">
                  <label>Enter OTP</label>
                  <input type="text" class="form-control" required/>
                </div>
              </div>
              <div class="modal-footer" style={{display:"flex",justifyContent:"center"}}>
              <Link href="#newPasswordModal" data-toggle="modal" variant="body2"> <input type="button" class="btn btn-primary" data-dismiss="modal" value="Submit"/></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="newPasswordModal" class="modal fade">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <form>
                                <div class="modal-header">						
                                    <h4 class="modal-title">Change password</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                </div>
                                <div class="modal-body">					
                                    <div class="form-group">
                                        <label>New Password</label>
                                        <input type="password" class="form-control" required/>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label>Confirm Password</label>
                                        <input type="password" class="form-control" id="myInput" required/>
                                    </div>
                                    <div class="form-group">
                                        <input type="checkbox" onClick={myFunction}/>  Show Password
                                    </div>					
                                </div>
                                <div class="modal-footer" style={{display:"flex",justifyContent:"center"}}>
                                    <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel"/>
                                    <input type="submit" class="btn btn-primary" value="Save"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

    </Grid>
    
  );
}

export default connect()(SignInSide)