const defaultEXpense = []
const CustomerRoomReducer =(state=defaultEXpense,action) =>{
    switch(action.type){
        case "SET_ROOMS":{
            console.log(action.room)
            return action.room
        }case "EDITALLROOM":{
            return state.map((expense)=>{
                if(expense.useid===action.userid)
                {
                    if(expense.id===action.id){
                        return{
                            ...expense,
                            ...action.updates
                        }
                    }
                }
                
                else{
                    return expense;
                }
                
            }
            )
        }    
        default:return state;
    }
}

export default CustomerRoomReducer;