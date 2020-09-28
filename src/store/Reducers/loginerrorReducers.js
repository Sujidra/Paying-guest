const loginErrorReducers = (state="",action)=>{
    switch(action.type){
        case "ERROR":{
            console.log(action.error);
            return action.error;
        }
        case "NOERROR":{
            console.log(action.error);
            return action.error;
        }
        default : return state
    }
}
export default loginErrorReducers