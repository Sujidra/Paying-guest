import React, { useState } from 'react';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../../assets/logo199.svg'
// import Divider from '@material-ui/core/Divider';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { connect } from 'react-redux';
import { baseurl } from '../../config';
import LinearProgress from '@material-ui/core/LinearProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


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
    totalarea:{
        backgroundColor:'white'
    },
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
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
  }
}));

function SignUp(props) {
  const classes = useStyles();
  const[name,changename]=useState("")
  const[phnum,changephnum]=useState("")
  const[password,changepassword]=useState("")
  const[isLoading,loadingChange]=useState(false)
  const[signupMsg,changeSignupMsg]=useState("")
  const[nameError,changenameError]=useState(false);
  const[passwordError,changepasswordError]=useState(false);
  const[phnumError,changephnumError]=useState(false);
  
  
  const onSubmitFunc=(e)=>{
    e.preventDefault();
    changenameError(false);
    changephnumError(false);
    changepasswordError(false);

    if(name===""||name===undefined)
    {
      changenameError(true);
    }
    else if(phnum===""||phnum===undefined||phnum.length!==10)
    {
      return changephnumError(true);
    }
    else if(password===""||password===undefined)
    {
      return changepasswordError(true);
    }
    else{
      loadingChange(true);
      var requestOptions = {
        method: 'POST',
        body: JSON.stringify({ name:name,phone_number:phnum, password:password}),
        redirect: 'follow'
      };
      
      fetch(baseurl+"/auth/register/reseller", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          changename("");
          changepassword("");
          changephnum("")
          if(result.status===200||result.status===403) {
            changeSignupMsg(result.message)
            loadingChange(false);
            document.getElementById("signupButtonLink").click()
          }
          else {
            changeSignupMsg("Some error occured")
            loadingChange(false);
          }
          window.sessionStorage.getItem('api_key');
        })
        .catch(error => {
          console.log('error', error)
          loadingChange(false);
        });
    }
    
  }

  
  return (
    <Container component="main" maxWidth="xs" className={classes.totalarea}>
      <CssBaseline />
      {
        (isLoading) && <LinearProgress />
      }

      <div className={classes.paper}>
        <img className={classes.signinlogo} alt="img" src={logo}></img>
        
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
                value={name}
                onChange={(e)=>{changename(e.target.value)}}
              />
               {
                  (nameError) ? <p style={{ color: 'red',margin:0 }}>* please enter your name</p> : <p></p>
               }
                   
            </Grid>
              
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Mobile Number"
                maxLength={10}
                name="email"
                value={phnum}
                onChange={(e)=>{changephnum(e.target.value)}}
              />
              {
                (phnumError) ? <p style={{ color: 'red',margin:0 }}>* please enter valid Mobile Number</p> : <p></p>
              }
               
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e)=>{changepassword(e.target.value)}}
              />
              {
                (passwordError) ? <p style={{ color: 'red',margin:0 }}>* please enter your password</p> : <p></p>
              }
               
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <div>
            <br></br>
          </div>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e)=>{onSubmitFunc(e)}}
            id="signup"
          >
            Sign Up
              
          </Button>
          <button type="button"  style={{display:"none"}} data-toggle="modal" data-target="#signupButton" id="signupButtonLink" ></button>
          <div id="signupButton" class="modal fade" >
            <div class="modal-dialog" style={{maxWidth:"350px"}}>
                <div class="modal-content">
                  <form>
                    <div class="modal-body">	
                      <div class="form-group" >
                      {
                        (signupMsg==="Account is Created")
                        ?
                        <CheckCircleIcon style={{width:"100%",display:"flex",justifyContent:"center",color:"green"}}  fontSize="large"/>
                        :
                        <ErrorOutlineIcon style={{width:"100%",display:"flex",justifyContent:"center",color:"red"}}  fontSize="large"/>

                      }
                                  
                        <h1 style={{display:"flex",justifyContent:"center"}}>{signupMsg}</h1>
                                            
                      </div>
                      
                    </div>
                    <div class="modal-footer" style={{display:"flex",justifyContent:"center"}}>
                    <input type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true" value="Ok" onClick={()=>{props.history.push("/")}} />
                      
                    </div>
                  </form>
                </div>
            </div>
          </div>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
     
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
   
  );
}

export default connect() (SignUp)