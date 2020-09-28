import firebase from "../../firebase/firebas"


export const successLogin =(id,usertype)=>{
return{
    type:"SUCCESS",
    id,
    usertype
}
}

export const loginError =()=>{
    return{
        type:"ERROR",
        error:"Please enter valid username and password"
    }
    }

export const noError =()=>{
    return{
        type:"NOERROR",
        error:""
    }
    }
    

export const failedLogin =(id)=>{
    return{
        type:"FAILED",
        id
    }
    }

const startLogin =({email,password})=>{
    /*const logindata={
        email,
        password
    }*/
    return(dispatch)=>{
        return firebase.database().ref(`users/${email}`).once("value").then((snapshot)=>{
            let orgipassword=snapshot.val().password;
            let userTy=snapshot.val().userType;
            if(password===orgipassword){
                let loginid=JSON.stringify(email)
                loginid=JSON.parse(loginid)
                localStorage.setItem("id",loginid);
                localStorage.setItem("userType",userTy);
                window.sessionStorage.setItem("id",loginid)
                window.sessionStorage.setItem("userType",userTy);
                dispatch(successLogin(loginid,userTy))
                dispatch(noError())
            }else{
                const loginid=""
                localStorage.setItem("id","");
                dispatch(loginError(loginid))
                dispatch(failedLogin())
            }
            
        }).catch((e)=>{
            dispatch(loginError())
            dispatch(failedLogin())
        })

    }
}
export default startLogin;