import {createStore,combineReducers,applyMiddleware} from "redux";
import RoomReducer from "./Reducers/expenseReducer"
import filterReducer from "./Reducers/filterReducer"
import thunk from "redux-thunk"
import loginReducer from "./Reducers/IdReducers"
import registedReducer from "./Reducers/registedReducer"
import loginErrorReducer from "./Reducers/loginerrorReducers";
import customerRoomReducer from "./Reducers/customerRoomReducer"


const storeConfig = ()=>{
    const store=createStore(combineReducers({
        rooms:RoomReducer,
        customerRooms:customerRoomReducer,
        filters:filterReducer,
        registed:registedReducer,
        auth:loginReducer,
        loginError:loginErrorReducer,
        
    }),
    applyMiddleware(thunk));
    return store;
}

export default storeConfig;
