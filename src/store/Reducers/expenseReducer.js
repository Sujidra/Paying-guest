const defaultEXpense = []
const ExpenseReducer =(state=defaultEXpense,action) =>{
    switch(action.type){
        case "ADD_EXPENSE":{
            let expobj={id:action.id,amt:action.amt,name:action.name,address:action.address,mindays:action.mindays,maxdays:action.maxdays,images:action.images,tags:action.tags,bookendDate:action.bookendDate,bookstartDate:action.bookstartDate}
            return [
                ...state,
                expobj
            ]
        }
        case "REMOVE_EXPENSE":{
            return state.filter(({id})=>{
                return id !==action.id
            })
        }
        case "EDITEXPENSE":{
            return state.map((expense)=>{
                if(expense.id===action.id){
                    return{
                        ...expense,
                        ...action.updates
                    }
                }
                else{
                    return expense;
                }
                
            }
            )
        }   
        case "SET_EXPENSE":{
            return action.expense
        }    
        default:return state;
    }
}

export default ExpenseReducer;