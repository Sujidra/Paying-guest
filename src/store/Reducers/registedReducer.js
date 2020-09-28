const registeredReducer = (state=" ",action)  =>{
    switch(action.type){
        case "REGISTERED":return{succsess:action.succsess};
        default:return state;

    }
    
}
export default registeredReducer;