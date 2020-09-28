const loginReducer = (state=" ",action)  =>{
    switch(action.type){
        case "SUCCESS":{
                    return {
                        auth:true,
                        authid:action.id,
                        userType:action.userType
                    }
                        }
        case "FAILED":return{
                    auth:false,
                    authid:action.id,
                    userType:"Not"
                      }
        case "LOGOUT": 
                    return {
                        auth:false,
                        authid:"",
                        userType:"Not"
                    }
        default:return state;

    }
    
}
export default loginReducer;